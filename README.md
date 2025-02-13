DETTAGLI IMPLEMENTATIVI DEL DATABASE

====================

STRUTTURA GENERALE

====================

    Focus principale: Gestione di attività (progetti o task), risorse logistiche (basi, magazzini, materiali), e supporto tecnico (on-call, on-site, field engineering).
    Caratteristiche distintive: Include trigger per mantenere la consistenza dei dati, vincoli di integrità referenziale tramite chiavi esterne e gestione automatizzata di calcoli (ad esempio, date lavorative).

Tabelle Principali
1. Attività

    Scopo: Gestisce i task o le attività assegnate a un responsabile specifico.
    Campi principali:
        ID (PK): Identificativo unico.
        DataInizio e DataFine: Periodo dell'attività.
        Titolo, Descrizione, Note: Dettagli dell'attività.
        Responsabile (FK): Collegato alla tabella Responsabili.
        TipoAttività: Specifica il tipo (enum: OnCallSupport, Correttive, FieldEngineering, OnSiteSupport).
    Trigger associati:
        Controllo su DataFine (non può essere prima di DataInizio).
        Default su DataInizio e DataFine se non forniti.

2. Base

    Scopo: Rappresenta le sedi operative o basi.
    Campi principali:
        ID (PK): Identificativo della base.
        Dettagli di indirizzo (Base_Citta, Base_Via, Base_NumeroCivico, Base_CAP).
        Base_Nome (Unique): Nome univoco della base.
        Base_Stormo: Stringa alfanumerica con vincolo di formato.
    Chiavi uniche: Identificano le basi in modo univoco basandosi su nome e città.

3. Responsabili

    Scopo: Elenca le persone responsabili delle attività.
    Campi principali:
        ID (PK): Identificativo del responsabile.
        Nome e Cognome: Dati anagrafici (chiave unica).
    Relazione con altre tabelle:
        Collegata alla tabella Attività tramite Responsabile.

4. FieldEngineering

    Scopo: Gestisce attività di ingegneria sul campo.
    Campi principali:
        ID (PK): Identificativo unico.
        Progressivo: Numero progressivo generato automaticamente.
        BaseID (FK): Collegato alla tabella Base.
        AttivitàID (FK): Collegato alla tabella Attività.
        TipologiaRichiesta (enum): Specifica il tipo di richiesta (MS, CM, TC, I).
        DataRisoluzione e Criticita: Data di completamento e livello di urgenza.
    Trigger associati:
        Imposta automaticamente DataRisoluzione basandosi su Criticita.

5. OnCallSupport e OnSiteSupport

    Scopo: Gestiscono il supporto tecnico, rispettivamente remoto (on-call) e in loco (on-site).
    Campi principali:
        ID (PK): Identificativo unico.
        TipologiaRichiesta: Tipo di intervento (MS, CM, ecc.).
        Criticita: Urgenza del supporto.
        MagazzinoID, BaseID (FK): Collegamenti a risorse e sedi.
        MaterialeID, Quantità (solo OnSite): Materiali richiesti.
    Trigger associati:
        Validazione obbligatoria degli allegati per alcune richieste.
        Aggiornamento automatico di DataFine in Attività.

6. GFE

    Scopo: Gestisce i beni materiali assegnati ai gruppi.
    Campi principali:
        ID (PK): Identificativo del bene.
        SN, PN, NUC: Numero di serie, parte, e codice univoco.
        Marca, Modello, DataArrivo: Dettagli del bene.
        BaseID e GruppoID (FK): Collegati a base e gruppo.

7. Magazzino e MaterialiMagazzino

    Scopo:
        Magazzino: Elenca i magazzini.
        MaterialiMagazzino: Gestisce l'inventario di ciascun magazzino.
    Campi principali di MaterialiMagazzino:
        ID (PK): Identificativo materiale.
        MagazzinoID (FK): Collegato a Magazzino.
        Categoria: Consumabile o hardware.
        Quantità e DataArrivo: Quantità disponibile e data di ingresso.

8. Movimentazioni

    Scopo: Traccia i prelievi e i ritiri di materiali.
    Campi principali:
        ID (PK): Identificativo del movimento.
        MaterialeID, MagazzinoID, BaseID, GruppoID (FK): Collegamenti con altre tabelle.
        TipoMovimento: Prelievo o Ritiro.
        Quantità e DataMovimento: Dettagli dell’operazione.

9. Gruppo

    Scopo: Organizza utenti e risorse in gruppi associati a basi specifiche.
    Campi principali:
        ID (PK): Identificativo gruppo.
        NomeGruppo: Nome univoco del gruppo.
        BaseID (FK): Collegamento alla base.

10. Riferimento_AMI

    Scopo: Elenca i riferimenti militari associati ai gruppi.
    Campi principali:
        ID (PK): Identificativo riferimento.
        Grado: Enum con vari gradi militari.
        Nome, Cognome, Email: Dati anagrafici e di contatto.
        Numero_Telefono o Numero_Cellulare: Obbligatorio almeno uno.
        GruppoID (FK): Collegato a Gruppo.

11. Scaffali

    Scopo: Dettaglia la disposizione fisica dei materiali nei magazzini.
    Campi principali:
        ID (PK): Identificativo dello scaffale.
        MagazzinoID (FK): Collegato al magazzino.
        Colonna e Ripiano: Posizione fisica.

Logiche Implementate

    Trigger: Automazione delle operazioni come progressivi, calcolo di date lavorative, e validazione di allegati.
    Vincoli: Garantiti tramite chiavi esterne e CHECK (es. numeri di telefono in Riferimento_AMI).
    Gestione delle date: Calcolo automatico di DataRisoluzione basato su criticità.

====================

TRIGGER DEL DATABASE

====================


Trigger della Tabella Attività

    BeforeInsertDataInizio
        Quando: Prima di inserire una nuova riga in Attività.
        Cosa fa:
            Se DataInizio non è specificata, la imposta alla data corrente (CURRENT_DATE).
        Scopo: Garantisce che tutte le attività abbiano una data di inizio valida.

    BeforeUpdateDataFine
        Quando: Prima di aggiornare una riga in Attività.
        Cosa fa:
            Se DataFine è precedente a DataInizio, genera un errore (utilizzando SIGNAL SQLSTATE).
            Se DataFine è NULL, la imposta alla data corrente.
        Scopo: Garantire la consistenza tra DataInizio e DataFine.

Trigger della Tabella FieldEngineering

    SetProgressivo_FieldEngineering
        Quando: Prima di inserire una nuova riga in FieldEngineering.
        Cosa fa:
            Calcola un valore progressivo univoco per la colonna Progressivo in base a BaseID.
        Scopo: Assicurare un progressivo unico per ogni base.

    BeforeInsertOrUpdate_FieldEngineering
        Quando: Prima di inserire o aggiornare una riga.
        Cosa fa:
            Recupera DataInizio dall'attività associata (AttivitàID).
            Calcola una DataRisoluzione in base alla criticità (3 giorni per critica, 20 giorni per non critica).
        Scopo: Automatizzare il calcolo della data di risoluzione in base ai parametri dell'attività.

    FieldEngineering_DataRisoluzioneCheck
        Quando: Prima di aggiornare una riga.
        Cosa fa:
            Se la TipologiaRichiesta è MS o CM e DataRisoluzione è definita, controlla che Allegato non sia NULL.
            Se mancano allegati, genera un errore.
        Scopo: Imporre la presenza di allegati obbligatori per alcune richieste.

    FieldEngineering_Update_DataFine
        Quando: Dopo l’aggiornamento di una riga.
        Cosa fa:
            Aggiorna DataFine nella tabella Attività collegata, basandosi su DataRisoluzione.
        Scopo: Sincronizzare automaticamente DataFine delle attività.

Trigger della Tabella OnCallSupport

    SetProgressivo_OnCallSupport
        Quando: Prima di inserire una nuova riga.
        Cosa fa:
            Calcola il progressivo unico per ogni base (BaseID).
        Scopo: Garantire un identificativo progressivo per ogni richiesta on-call.

    BeforeInsertOrUpdate_OnCallSupport
        Quando: Prima di inserire o aggiornare una riga.
        Cosa fa:
            Recupera DataInizio dall'attività associata e calcola DataRisoluzione basandosi sulla criticità.
        Scopo: Automatizzare il calcolo della data di risoluzione.

    Prelievo_MS
        Quando: Dopo l’inserimento di una nuova riga.
        Cosa fa:
            Se la TipologiaRichiesta è MS, registra automaticamente una movimentazione di prelievo per un materiale consumabile dal magazzino.
        Scopo: Automatizzare la gestione delle risorse per le richieste MS.

    OnCallSupport_DataRisoluzioneCheck
        Quando: Prima di aggiornare una riga.
        Cosa fa:
            Richiede che le richieste MS o CM abbiano allegati obbligatori.
        Scopo: Garantire che tutte le richieste abbiano i documenti necessari.

    OnCallSupport_Update_DataFine
        Quando: Dopo l'aggiornamento di una riga.
        Cosa fa:
            Aggiorna DataFine della corrispondente attività nella tabella Attività.
        Scopo: Mantenere la coerenza tra OnCallSupport e Attività.

Trigger della Tabella OnSiteSupport

    SetProgressivo_OnSiteSupport
        Quando: Prima di inserire una nuova riga.
        Cosa fa:
            Calcola il progressivo univoco per BaseID.
        Scopo: Garantire numerazione progressiva per richieste on-site.

    BeforeInsertOrUpdate_OnSiteSupport
        Quando: Prima di inserire o aggiornare una riga.
        Cosa fa:
            Calcola DataRisoluzione basandosi su DataInizio e criticità.
        Scopo: Automatizzare la gestione delle date.

    OnSiteSupport_Movimentazioni
        Quando: Dopo l’inserimento di una nuova riga.
        Cosa fa:
            Genera automaticamente una movimentazione di ritiro o fornitura di materiale basandosi sulla TipologiaRichiesta.
        Scopo: Integrare il flusso logistico con la gestione delle richieste.

    OnSiteSupport_DataRisoluzioneCheck
        Quando: Prima di aggiornare una riga.
        Cosa fa:
            Richiede che le richieste MS o CM abbiano allegati.
        Scopo: Imporre la validità delle richieste.

    OnSiteSupport_Update_DataFine
        Quando: Dopo l'aggiornamento di una riga.
        Cosa fa:
            Aggiorna DataFine nella tabella Attività.
        Scopo: Mantenere la consistenza con la risoluzione delle attività.


========================

RELAZIONE TRA LE TABELLE

========================

Ecco come le tabelle sono collegate tramite chiavi esterne:

    Attività
        Responsabile → Responsabili.ID

    FieldEngineering
        BaseID → Base.ID
        AttivitàID → Attività.ID

    OnCallSupport
        BaseID → Base.ID
        MagazzinoID → Magazzino.ID
        AttivitàID → Attività.ID

    OnSiteSupport
        BaseID → Base.ID
        MagazzinoID → Magazzino.ID
        AttivitàID → Attività.ID
        MaterialeID → MaterialiMagazzino.ID

    GFE
        BaseID → Base.ID
        GruppoID → Gruppo.ID

    MaterialiMagazzino
        MagazzinoID → Magazzino.ID

    Movimentazioni
        MaterialeID → MaterialiMagazzino.ID
        MagazzinoID → Magazzino.ID
        BaseID → Base.ID
        GruppoID → Gruppo.ID

    Riferimento_AMI
        GruppoID → Gruppo.ID

    Scaffali
        MagazzinoID → Magazzino.ID

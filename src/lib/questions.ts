import { Question } from "@/types";

const rawQuestions: Question[] = [
  // ─── KOMPILERING / LINKING ────────────────────────────────────────────────

  {
    id: "v24v1-q1",
    variantGroupId: "kompilering-linking-1",
    source: "V24V1",
    topic: "Kompilering og linking",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Linkeren sin oppgave er å kombinere kildekode til en enkelt kjørefil (executable).",
        isCorrect: false,
        explanation:
          "Feil. Det er kompilatoren som behandler kildekode – linkeren kombinerer objektfiler (kompilert kode), ikke kildekode.",
      },
      {
        id: "b",
        text: "Man kan finne feil i et program både under kompilering og under linking.",
        isCorrect: true,
        explanation:
          "Riktig. Kompilatoren oppdager syntaksfeil og typefeil, mens linkeren oppdager manglende definisjoner (udefinerte symboler).",
      },
      {
        id: "c",
        text: "Kompilatoren sin oppgave er å kombinere objektkode fra forskjellige filer og produsere en enkelt kjørefil (executable).",
        isCorrect: false,
        explanation:
          "Feil. Det er linkerens oppgave å kombinere objektfiler til en kjørefil – kompilatoren lager objektfiler fra kildekode.",
      },
      {
        id: "d",
        text: "En kompilator produserer ingen filer.",
        isCorrect: false,
        explanation:
          "Feil. Kompilatoren produserer objektfiler (.o eller .obj) fra kildefilene.",
      },
    ],
  },

  {
    id: "v24v2-q1",
    variantGroupId: "kompilering-linking-1",
    source: "V24V2",
    topic: "Kompilering og linking",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Man kan ta en kjørefil (executable) og kjøre den på et hvilket som helst operativsystem.",
        isCorrect: false,
        explanation:
          "Feil. En kjørefil er kompilert for en spesifikk plattform og prosessorarkitektur, og er ikke direkte overførbar til andre operativsystemer.",
      },
      {
        id: "b",
        text: "Når man kjører et kompilert program vil man ikke få kjøretidsfeil.",
        isCorrect: false,
        explanation:
          "Feil. Kjøretidsfeil (som divisjon med null, out-of-bounds, etc.) kan oppstå selv om programmet kompilerte uten feil.",
      },
      {
        id: "c",
        text: "Man kan ta en kjørefil (executable) og kjøre den på hvilken som helst datamaskin.",
        isCorrect: false,
        explanation:
          "Feil. En kjørefil kompilert for x86 kan ikke kjøre på ARM uten recompilering, og er plattformavhengig.",
      },
      {
        id: "d",
        text: "Før man kan kjøre et C++ program må man kompilere kildekoden.",
        isCorrect: true,
        explanation:
          "Riktig. C++ er et kompilert språk – kildekoden må oversettes til maskinkode av en kompilator før programmet kan kjøres.",
      },
    ],
  },

  {
    id: "v25v2-q4",
    variantGroupId: "kompilering-linking-2",
    source: "V25V2",
    topic: "Kompilering og linking",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En kompilator oversetter kildekode til maskinkode.",
        isCorrect: true,
        explanation:
          "Riktig. Kompilatorens primære oppgave er å oversette menneskelig lesbar kildekode til maskinkode (objektkode).",
      },
      {
        id: "b",
        text: "Ethvert C++ program må ha nøyaktig én main() funksjon.",
        isCorrect: true,
        explanation:
          "Riktig. C++-standarden krever at et kjørbart program har nøyaktig én main()-funksjon som er inngangspunktet til programmet.",
      },
      {
        id: "c",
        text: "Lenkefasen setter sammen objekt-filer til et kjørbart program.",
        isCorrect: true,
        explanation:
          "Riktig. Linkeren (lenkeren) tar objektfilene fra kompilatoren og setter dem sammen (linker biblioteker og løser symbolreferanser) til en kjørbar fil.",
      },
      {
        id: "d",
        text: "Syntaksfeil blir oppdaget og rapportert i lenkefasen.",
        isCorrect: false,
        explanation:
          "Feil. Syntaksfeil oppdages under kompileringsfasen, ikke lenkefasen. Lenkefasen håndterer udefinerte symboler og konflikterende definisjoner.",
      },
    ],
  },

  {
    id: "v25v1-q4",
    variantGroupId: "kompilering-linking-3",
    source: "V25V1",
    topic: "Kompilering og linking",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Hver .cpp-fil (for eksempel name.cpp) med unntak av main.cpp må ha en tilsvarende .h-fil (for eksempel name.h) innenfor et gitt C++-prosjekt.",
        isCorrect: false,
        explanation:
          "Feil. Det er ingen slik regel i C++. En .cpp-fil trenger ikke ha en tilsvarende .h-fil – dette er bare én vanlig konvensjon.",
      },
      {
        id: "b",
        text: "I løpet av kompileringsfasen behandles en C++-kildefil (.cpp) fra topp til bunn.",
        isCorrect: true,
        explanation:
          "Riktig. Kompilatoren prosesserer kildekoden sekvensielt fra topp til bunn, noe som er grunnen til at man trenger fremoverdeklarasjoner.",
      },
      {
        id: "c",
        text: "Funksjonsdefinisjoner bør plasseres i en header-fil.",
        isCorrect: false,
        explanation:
          "Feil. Funksjonsdefinisjoner bør som regel plasseres i .cpp-filer. Header-filer (.h) bør inneholde deklarasjoner. Unntak gjelder for inline-funksjoner og templates.",
      },
      {
        id: "d",
        text: '\"Type\"-feil kan oppstå både i kompilerings- og lenkefasen, mens manglende header-feil bare vises i lenkefasen.',
        isCorrect: false,
        explanation:
          "Feil. Manglende header-feil oppdages i kompileringsfasen (ikke lenkefasen) siden #include behandles av preprosessoren.",
      },
    ],
  },

  // ─── DATATYPER ────────────────────────────────────────────────────────────

  {
    id: "v24v1-q2",
    variantGroupId: "datatyper-1",
    source: "V24V1",
    topic: "Datatyper",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Det spiller ingen rolle hvilken datatype man bruker med tanke på ytelse.",
        isCorrect: false,
        explanation:
          "Feil. Valg av datatype påvirker ytelse. For eksempel er heltallsoperasjoner raskere enn flytallsoperasjoner på mange prosessorer.",
      },
      {
        id: "b",
        text: "Divisjon av heltall gir svar som er avrundet til nærmeste hele tall.",
        isCorrect: false,
        explanation:
          "Feil. Heltallsdivisjon i C++ avkorter (trunkerer) mot null, ikke avrunder. 7/2 = 3, ikke 4.",
      },
      {
        id: "c",
        text: "Man kan lagre høyere verdier i en unsigned int en i en int.",
        isCorrect: true,
        explanation:
          "Riktig. unsigned int bruker alle bitene til positive tall, mens int bruker ett bit til fortegn. unsigned int kan typisk lagre verdier opp til 4.294.967.295, mens int går opp til 2.147.483.647.",
      },
      {
        id: "d",
        text: "En unsigned int bruker like mange bits som en int.",
        isCorrect: true,
        explanation:
          "Riktig. Begge typene er typisk 32 bits (4 bytes) – forskjellen er fortegnsbitet, ikke størrelsen.",
      },
    ],
  },

  {
    id: "v25v2-q2",
    variantGroupId: "datatyper-1",
    source: "V25V2",
    topic: "Datatyper",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En verdi med type 'float' kan bli oversatt til en av type 'double' uten tap av presisjon.",
        isCorrect: true,
        explanation:
          "Riktig. Konvertering fra float til double er en utvidende konvertering (widening conversion). Alle verdier som kan representeres som float kan også representeres som double.",
      },
      {
        id: "b",
        text: "Å legge sammen to tilfeldige flyttall kan gi tap av presisjon.",
        isCorrect: true,
        explanation:
          "Riktig. Flytallsaritmetikk kan føre til avrundingsfeil fordi ikke alle desimaltall kan representeres nøyaktig i binær flytallsformat.",
      },
      {
        id: "c",
        text: "Når man legger sammen to tall med datatyper 'float' og 'int', blir først tallet med type 'int' oversatt til en 'float'.",
        isCorrect: true,
        explanation:
          "Riktig. Implisitt typekonvertering i C++ følger vanlig aritmetisk konvertering: int konverteres til float for å matche den bredere typen.",
      },
      {
        id: "d",
        text: "Når en heltallsvariabel er satt til den minste verdien som datatypen kan representere, og deretter reduseres med 1, blir resultatet den største verdien som kan representeres av den datatypen.",
        isCorrect: true,
        explanation:
          "Riktig for unsigned typer: unsigned heltall wrapper rundt (wraparound). For eksempel: 0u - 1 = UINT_MAX. For signed heltall er dette teknisk sett udefinert oppforsvar, men i praksis skjer det samme.",
      },
    ],
  },

  {
    id: "v25v1-q2",
    variantGroupId: "datatyper-2",
    source: "V25V1",
    topic: "Datatyper",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Datatyper kan ha samme navn så lenge de er deklarert i et annet navnerom.",
        isCorrect: true,
        explanation:
          "Riktig. Navnerom (namespaces) skaper separate skop, slik at to typer med samme navn kan eksistere i forskjellige namespaces uten konflikt.",
      },
      {
        id: "b",
        text: "std::vector og std::string er eksempler på objekter.",
        isCorrect: false,
        explanation:
          "Feil. std::vector og std::string er typer (klasser/klasse-maler), ikke objekter. Instanser av disse er objekter, f.eks. er 'std::vector<int> v' et objekt.",
      },
      {
        id: "c",
        text: "Objekter består vanligvis av både variabler og metoder/medlemsfunksjoner.",
        isCorrect: true,
        explanation:
          "Riktig. I objektorientert programmering er et objekt en instans av en klasse som typisk har medlemsvariabler (data) og medlemsfunksjoner (metoder).",
      },
      {
        id: "d",
        text: "En type bestemmer settet med verdier en variabel kan ha.",
        isCorrect: true,
        explanation:
          "Riktig. En type definerer hvilke verdier en variabel kan holde, hvilke operasjoner som kan utføres på den, og hvordan den lagres i minnet.",
      },
    ],
  },

  // ─── FLYT-TALL ────────────────────────────────────────────────────────────

  {
    id: "v25v1-q1",
    variantGroupId: "flyttall-1",
    source: "V25V1",
    topic: "Flyt-tall",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Ikke alle flyt-tallberegninger kan gjøres presist. De må avrundes til nærmeste mulige verdi.",
        isCorrect: true,
        explanation:
          "Riktig. Flytall lagres i binær representasjon med begrenset presisjon. Mange desimaltall (som 0.1) kan ikke representeres nøyaktig og avrundes.",
      },
      {
        id: "b",
        text: "Tall av typen «double» kan representere omtrent dobbelt så mange unike tall som tall av typen «float».",
        isCorrect: false,
        explanation:
          "Feil. double har 52 bits mantissa mot floats 23 bits, som gir ca. 2^29 ganger flere unike verdier – langt mer enn dobbelt.",
      },
      {
        id: "c",
        text: "Flyt-tall (float) i C++ kan representere flere ulike tall mellom 0 og 1 enn mellom 10 og 11.",
        isCorrect: true,
        explanation:
          "Riktig. I IEEE 754-format er flytall tettere pakket nær null. Intervallet [0,1] inneholder langt flere representable flytall enn [10,11].",
      },
      {
        id: "d",
        text: "Flyt-talltypen (float) har en spesiell verdi som representerer \"uendelig\".",
        isCorrect: true,
        explanation:
          "Riktig. IEEE 754 definerer spesialverdier for positiv uendelig (+∞), negativ uendelig (-∞) og NaN (Not a Number).",
      },
    ],
  },

  {
    id: "v25v2-q1",
    variantGroupId: "flyttall-1",
    source: "V25V2",
    topic: "Flyt-tall",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Tall av typen 'double' kan representere omtrent dobbelt så mange unike tall som tall av typen 'float'.",
        isCorrect: false,
        explanation:
          "Feil. double bruker 64 bits og float bruker 32 bits. double kan representere drastisk mange flere unike tall – ikke bare dobbelt.",
      },
      {
        id: "b",
        text: "Det største positive tallet som kan representeres av en 'unsigned int' er større enn det som kan representeres av en 'int'.",
        isCorrect: true,
        explanation:
          "Riktig. unsigned int (32-bit) kan representere 0 til 4.294.967.295, mens int (32-bit) kan representere -2.147.483.648 til 2.147.483.647. Maksverdien er altså dobbelt så stor for unsigned.",
      },
      {
        id: "c",
        text: "En 'unsigned int' tar opp mindre plass i minnet enn en 'int'.",
        isCorrect: false,
        explanation:
          "Feil. unsigned int og int er begge typisk 32 bits (4 bytes) store. Fortegnet påvirker ikke størrelsen.",
      },
      {
        id: "d",
        text: "Flyttall av type 'double' bruker dobbelt så mye plass i minnet som et tall av typen 'float'.",
        isCorrect: true,
        explanation:
          "Riktig. float bruker 32 bits (4 bytes) og double bruker 64 bits (8 bytes). double er nøyaktig dobbelt så stort.",
      },
    ],
  },

  // ─── SKOP ─────────────────────────────────────────────────────────────────

  {
    id: "v24v1-q3",
    variantGroupId: "skop-1",
    source: "V24V1",
    topic: "Skop",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `namespace foo {
    int x;
    int bar() { return x; }
}

int f(int y) {
    int z = 0;
    for (int i = 0; i < 10; i++) {
        z += i * y;
    }
    return z;
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Navnerommet foo er i globalt skop.",
        isCorrect: true,
        explanation:
          "Riktig. Navnerommet foo er deklarert på toppnivå, utenfor enhver funksjon eller klasse, og befinner seg dermed i globalt skop.",
      },
      {
        id: "b",
        text: "Variablene x og y er i lokalt skop.",
        isCorrect: false,
        explanation:
          "Feil. x er i foo-navnerommets skop (ikke lokalt), mens y er en parameter til funksjonen f (lokalt i f). De er i forskjellige skop.",
      },
      {
        id: "c",
        text: "Variabelen z er skopet til for-løkka.",
        isCorrect: false,
        explanation:
          "Feil. z er deklarert i funksjonsblokken til f, ikke inne i for-løkka. z er tilgjengelig i hele f, ikke bare i løkka.",
      },
      {
        id: "d",
        text: "Funksjonen bar() kan ikke kalles fra f() fordi f() er deklarert utenfor navnerommet foo.",
        isCorrect: false,
        explanation:
          "Feil. bar() kan kalles fra f() ved å bruke foo::bar(). At f() er utenfor foo hindrer ikke at man kaller funksjoner i foo.",
      },
    ],
  },

  {
    id: "v24v2-q4",
    variantGroupId: "skop-1",
    source: "V24V2",
    topic: "Skop",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Man kan ikke definere en klasse i det globale skopet.",
        isCorrect: false,
        explanation:
          "Feil. Klasser kan defineres i globalt skop. Dette er faktisk det vanligste stedet å definere klasser i C++.",
      },
      {
        id: "b",
        text: "Man kan ikke definere en klasse i skopet til en funksjon.",
        isCorrect: false,
        explanation:
          "Feil. C++ tillater lokale klasser – klasser definert inne i funksjoner. Slike klasser kan bare brukes innenfor den funksjonen.",
      },
      {
        id: "c",
        text: "Man kan deklarere nye medlemsfunksjoner til en klasse etter at klassen er deklarert.",
        isCorrect: true,
        explanation:
          "Riktig. Medlemsfunksjoner kan defineres utenfor klassekroppen ved hjelp av scope resolution operator (::). For eksempel: void MyClass::myMethod() { ... }",
      },
      {
        id: "d",
        text: "Man kan definere en medlemsfunksjon både i og utenfor klassedefinisjonen.",
        isCorrect: true,
        explanation:
          "Riktig. Korte funksjoner defineres ofte inne i klassen (inline), mens lengre funksjoner typisk defineres utenfor klassen i en .cpp-fil.",
      },
    ],
  },

  // ─── RAII ─────────────────────────────────────────────────────────────────

  {
    id: "v24v1-q4",
    variantGroupId: "raii-1",
    source: "V24V1",
    topic: "RAII",
    stem: "Se på klassedeklarasjonen under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `class A {
    int *ptr;
public:
    A(int val) {
        ptr = new int(val);
    }

    void delete() {
        delete ptr;
    }
};`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Klassen overholder RAII (Resource Acquisition Is Initialization).",
        isCorrect: false,
        explanation:
          "Feil. RAII krever at ressurser frigjøres automatisk i destruktøren. Klasse A har ingen destruktør – frigjøring skjer bare om man manuelt kaller delete().",
      },
      {
        id: "b",
        text: "Klassen har en implisitt standard (default) destruktør.",
        isCorrect: true,
        explanation:
          "Riktig. Siden ingen destruktør er deklarert, genererer kompilatoren en implisitt default destruktør. Denne frigjør ikke heap-allokert minne.",
      },
      {
        id: "c",
        text: "Hadde klassen hatt en kopikonstruktør, hadde klassen overholdt RAII (Resource Acquisition Is Initialization).",
        isCorrect: false,
        explanation:
          "Feil. RAII handler om destruktøren, ikke kopikonstruktøren. Klassen trenger en destruktør som frigjør ptr for å overholde RAII.",
      },
      {
        id: "d",
        text: "Når en instans av klassen A går ut av skop vil ressursene til klassen implisitt frigjøres.",
        isCorrect: false,
        explanation:
          "Feil. Den implisitte destruktøren frigjør ikke heap-allokert minne. ptr vil ikke bli deleted automatisk – dette forårsaker en minnelekkasje.",
      },
    ],
  },

  {
    id: "v24v2-q5",
    variantGroupId: "raii-1",
    source: "V24V2",
    topic: "RAII",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `int* foo(int a) {
    int *ptr = new int(a);
    return ptr;
}

void bar(int b) {
    int* ptr = foo(b);
    std::vector<int> vec;
    vec.push_back(b);
}

int main() {
    bar(5);
    return 0;
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Koden inneholder en minnelekkasje.",
        isCorrect: true,
        explanation:
          "Riktig. foo() allokerer minne med new, men ingen kaller delete på ptr i bar(). Minnet lekker.",
      },
      {
        id: "b",
        text: "På linje 14 vil minnet som ptr peker til være frigjort.",
        isCorrect: false,
        explanation:
          "Feil. ptr er en rå peker og destruktøren frigjør ikke automatisk heap-minne. Minnet er ikke frigjort.",
      },
      {
        id: "c",
        text: "På linje 14 vil ressursene allokert til vec være frigjort.",
        isCorrect: true,
        explanation:
          "Riktig. vec er en lokal variabel på stakken. Når bar() returnerer, kalles std::vector sin destruktør automatisk og frigjør heap-minnet til elementene.",
      },
      {
        id: "d",
        text: "Det allokeres ingen ressurser til vec som må frigjøres.",
        isCorrect: false,
        explanation:
          "Feil. std::vector allokerer heap-minne for elementene. Vektorens destruktør frigjør dette automatisk.",
      },
    ],
  },

  {
    id: "custom-raii-1",
    variantGroupId: "raii-2",
    source: "Egenlaget",
    topic: "RAII",
    stem: "Se på klassedeklarasjonen under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `class Buffer {
    double *data;
public:
    Buffer(int size) {
        data = new double[size];
    }

    ~Buffer() {
        delete[] data;
    }
};

void process() {
    Buffer buf(100);
    throw std::runtime_error("Feil!");
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Koden forårsaker en minnelekkasje fordi unntak kastes i process().",
        isCorrect: false,
        explanation:
          "Riktig. Buffer har en destruktør, og RAII sikrer at ~Buffer() kalles automatisk når stack unwinding skjer etter at unntaket kastes.",
      },
      {
        id: "b",
        text: "Klassen Buffer overholder RAII.",
        isCorrect: true,
        explanation:
          "Riktig. Buffer anskaffer ressurs i konstruktøren (new) og frigjør den i destruktøren (delete[]). Dette er definisjonen av RAII.",
      },
      {
        id: "c",
        text: "Destruktøren til Buffer kalles aldri i process() fordi et unntak kastes.",
        isCorrect: false,
        explanation:
          "Feil. C++ garanterer at destruktører for lokale objekter kalles under stack unwinding, selv om et unntak kastes.",
      },
      {
        id: "d",
        text: "Man bør bruke delete i stedet for delete[] i destruktøren.",
        isCorrect: false,
        explanation:
          "Feil. Siden data ble allokert med new double[size] (array-new), må den frigjøres med delete[] – ikke delete.",
      },
    ],
  },

  // ─── DESTRUKTØRER ─────────────────────────────────────────────────────────

  {
    id: "v24v1-q5",
    variantGroupId: "destruktorer-1",
    source: "V24V1",
    topic: "Destruktører",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En destruktør frigjør ressursene til et klasseobjekt.",
        isCorrect: true,
        explanation:
          "Riktig. Destruktørens primære formål er å frigjøre ressurser (minne, filhåndtere, etc.) som objektet eier.",
      },
      {
        id: "b",
        text: "Enhver klasse har en destruktør.",
        isCorrect: true,
        explanation:
          "Riktig. Hvis man ikke definerer en destruktør eksplisitt, genererer kompilatoren en implisitt default destruktør.",
      },
      {
        id: "c",
        text: "Når en destruktør har blitt kalt, kan man ikke lenger initialisere objekter av klassen.",
        isCorrect: false,
        explanation:
          "Feil. At en destruktør kalles på ett objekt påvirker ikke muligheten til å opprette nye objekter av klassen.",
      },
      {
        id: "d",
        text: "En destruktør må eksplisitt kalles.",
        isCorrect: false,
        explanation:
          "Feil. Destruktører kalles automatisk: for stakk-objekter når de går ut av skop, for heap-objekter når delete kalles.",
      },
    ],
  },

  {
    id: "v24v2-q7",
    variantGroupId: "destruktorer-1",
    source: "V24V2",
    topic: "Destruktører",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte om en rent virtuell (pure virtual) destruktør?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Tvinge arvende klasser til å implementere egne destruktører.",
        isCorrect: true,
        explanation:
          "Riktig. En ren virtuell destruktør gjør klassen abstrakt og tvinger barneklasser til å implementere sin egen destruktør.",
      },
      {
        id: "b",
        text: "Forsikre at destruktøren ikke kalles for å bedre ytelsen.",
        isCorrect: false,
        explanation:
          "Feil. En ren virtuell destruktør er ikke for ytelse. Destruktøren kalles fortsatt normalt.",
      },
      {
        id: "c",
        text: "Sikre at man ikke kan initialisere et objekt av baseklassen.",
        isCorrect: false,
        explanation:
          "Feil. En ren virtuell destruktør gjør klassen abstrakt, men dette er en bieffekt av å gjøre destruktøren ren virtuell, ikke det primære formålet.",
      },
      {
        id: "d",
        text: "Sikre at en klasse ikke kan arves fra.",
        isCorrect: false,
        explanation:
          "Feil. En ren virtuell destruktør forhindrer ikke arv – tvert om, den oppfordrer til det ved å tvinge barneklasser til å implementere destruktøren.",
      },
    ],
  },

  // ─── UNNTAKSHÅNDTERING ────────────────────────────────────────────────────

  {
    id: "v24v1-q6",
    variantGroupId: "unntak-1",
    source: "V24V1",
    topic: "Unntakshåndtering",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Man bør plassere kode som kan utløse unntak i en catch-blokk.",
        isCorrect: false,
        explanation:
          "Feil. Kode som kan kaste unntak plasseres i try-blokken, ikke catch-blokken. catch-blokken er der man håndterer unntakene.",
      },
      {
        id: "b",
        text: "En enkel try-blokk kan ha flere tilhørende catch-blokker for å fange ulike unntak.",
        isCorrect: true,
        explanation:
          "Riktig. En try-blokk kan etterfølges av flere catch-blokker, hver for å håndtere ulike unntakstyper (f.eks. std::runtime_error, std::logic_error, ...).",
      },
      {
        id: "c",
        text: "Unntak i C++ blir fanget av kompilatoren.",
        isCorrect: false,
        explanation:
          "Feil. Unntak er kjøretidsfenomener, ikke kompileringstidsfenomener. De kastes og fanges under programkjøring.",
      },
      {
        id: "d",
        text: "Unntak kan ikke fanges ved referanse.",
        isCorrect: false,
        explanation:
          "Feil. Det anbefales å fange unntak ved konstant referanse (catch(const std::exception& e)) for å unngå kopiering og bevare polymorfi.",
      },
    ],
  },

  {
    id: "v24v2-q8",
    variantGroupId: "unntak-1",
    source: "V24V2",
    topic: "Unntakshåndtering",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Alle ressurser blir automatisk frigjort når et unntak kastes.",
        isCorrect: false,
        explanation:
          "Feil. Bare ressurser til stakk-allokerte objekter (via RAII) frigjøres automatisk. Rå pekere til heap-minne frigjøres ikke automatisk.",
      },
      {
        id: "b",
        text: "C++ splitter unntak i detektering, via en try-blokk, og håndtering, via catch-blokker.",
        isCorrect: true,
        explanation:
          "Riktig. try-blokken markerer kode der unntak kan oppstå, og catch-blokkene håndterer de aktuelle unntakene.",
      },
      {
        id: "c",
        text: "Hvis du bruker at()-funksjonen for å indeksere en std::vector, men indeksen er utenfor rekkevidde, kan du fange det med en std::runtime_error.",
        isCorrect: false,
        explanation:
          "Feil. at() kaster std::out_of_range, som er en underklasse av std::logic_error, ikke std::runtime_error.",
      },
      {
        id: "d",
        text: "Unntakshåndtering er et eksempel på flytkontroll.",
        isCorrect: true,
        explanation:
          "Riktig. Unntakshåndtering er en form for flytkontroll der programflyten bryter ut av normal kjøring og hopper til nærmeste passende catch-blokk.",
      },
    ],
  },

  {
    id: "v25v1-q11",
    variantGroupId: "unntak-2",
    source: "V25V1",
    topic: "Unntakshåndtering",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En 'try/catch'-blokk behandler bare unntak som er kastet (med 'throw') innenfor samme funksjon.",
        isCorrect: false,
        explanation:
          "Feil. Unntak propagerer gjennom kallstakken. Et unntak kastet i en funksjon kallt fra try-blokken vil også fanges av catch-blokken.",
      },
      {
        id: "b",
        text: "En 'try/catch'-blokk må fange alle typer unntak som kan kastes innenfor try-blokken.",
        isCorrect: false,
        explanation:
          "Feil. Du trenger ikke fange alle unntakstyper. Ufangede unntak propagerer videre opp i kallstakken.",
      },
      {
        id: "c",
        text: "En enkelt 'catch'-setning kan fange/behandle flere typer unntak.",
        isCorrect: true,
        explanation:
          "Riktig. For eksempel kan catch(const std::exception& e) fange alle unntakstyper som arver fra std::exception, som inkluderer std::runtime_error og std::logic_error.",
      },
      {
        id: "d",
        text: "Om det finnes flere 'catch'-setninger som kan behandle samme type unntak, utføres bare den første 'catch'-setningen.",
        isCorrect: true,
        explanation:
          "Riktig. Catch-blokker evalueres i rekkefølge, og kun den første matchende catch-blokken kjøres.",
      },
    ],
  },

  {
    id: "v25v2-q7",
    variantGroupId: "unntak-2",
    source: "V25V2",
    topic: "Unntakshåndtering",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "throw setninger kan bare brukes inni en try-blokk, eller en funksjon som kalles fra en try-blokk.",
        isCorrect: false,
        explanation:
          "Feil. throw kan brukes hvor som helst i koden. Om det ikke er en try/catch i nærheten, propagerer unntaket opp i kallstakken.",
      },
      {
        id: "b",
        text: "Et unntak er en feil som oppstår mens programmet kompileres.",
        isCorrect: false,
        explanation:
          "Feil. Unntak er kjøretidsfenomener. Kompileringstidsfeil er syntaksfeil og typefeil – ikke unntak.",
      },
      {
        id: "c",
        text: "Hver try-blokk kan maks ha én catch setning.",
        isCorrect: false,
        explanation:
          "Feil. En try-blokk kan ha så mange catch-blokker man ønsker, for å håndtere ulike unntakstyper.",
      },
      {
        id: "d",
        text: "Når en catch setning tar en referanse med type std::exception som argument, fanger/håndterer den også unntak med datatyper som arver fra std::exception.",
        isCorrect: true,
        explanation:
          "Riktig. Dette er polymorfi i aksjon. catch(const std::exception& e) vil fange alle unntak hvis type er std::exception eller en avledet klasse.",
      },
    ],
  },

  // ─── PEKERE ───────────────────────────────────────────────────────────────

  {
    id: "v24v1-q7",
    variantGroupId: "pekere-1",
    source: "V24V1",
    topic: "Pekere",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `int a = 10;
int* b = &a;`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "*(b++) endrer adressen som b inneholder.",
        isCorrect: true,
        explanation:
          "Riktig. b++ øker adressen i b (post-increment på pekeren), og * derefererer den originale adressen. Netto effekt er at b peker til neste minneadresse.",
      },
      {
        id: "b",
        text: "b++ endrer verdien som b peker til.",
        isCorrect: false,
        explanation:
          "Feil. b++ øker adressen lagret i b (pekerens verdi), ikke verdien på minneadressen b peker til.",
      },
      {
        id: "c",
        text: "a++ endrer verdien til a.",
        isCorrect: true,
        explanation:
          "Riktig. a++ øker verdien til variabelen a med 1 (post-increment). a blir 11.",
      },
      {
        id: "d",
        text: "*(b++) endrer verdien til a.",
        isCorrect: false,
        explanation:
          "Feil. *(b++) derefererer den originale adressen (leser verdien), men endrer ikke verdien der – det er b-pekeren som flyttes, ikke *a.",
      },
    ],
  },

  {
    id: "v24v2-q9",
    variantGroupId: "pekere-1",
    source: "V24V2",
    topic: "Pekere",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Hvis man vil finne minneadressen til en verdi kan man bruke *-operatoren.",
        isCorrect: false,
        explanation:
          "Feil. *-operatoren derefererer en peker (gir verdien på adressen). For å finne adressen til en variabel bruker man &-operatoren.",
      },
      {
        id: "b",
        text: "Hvis man vil lese verdien som en peker peker til kan man bruke &-operatoren.",
        isCorrect: false,
        explanation:
          "Feil. &-operatoren gir adressen til en variabel. For å lese verdien en peker peker til bruker man *-operatoren (dereferering).",
      },
      {
        id: "c",
        text: "Hvis man vil endre verdien som en peker peker til kan man bruke *-operatoren.",
        isCorrect: true,
        explanation:
          "Riktig. *ptr = nyVerdi derefererer pekeren og skriver en ny verdi til minneadressen pekeren peker til.",
      },
      {
        id: "d",
        text: "Hvis man vil endre verdien som en peker peker til kan man bruke []-operatoren.",
        isCorrect: true,
        explanation:
          "Riktig. ptr[0] = nyVerdi er ekvivalent med *(ptr+0) = nyVerdi og endrer verdien pekeren peker til.",
      },
    ],
  },

  {
    id: "lf-q9",
    variantGroupId: "pekere-2",
    source: "LF",
    topic: "Pekere",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En peker kan ikke referere til en verdi som ikke eksisterer.",
        isCorrect: false,
        explanation:
          "Feil. En peker kan peke til ugyldig minne (dangling pointer) eller nullptr. Det er programmerens ansvar å sikre gyldige pekere.",
      },
      {
        id: "b",
        text: "&-operatoren kan brukes til å finne adressen til en variabel.",
        isCorrect: true,
        explanation:
          "Riktig. &x gir minneadressen til variabelen x. Denne adressen kan lagres i en peker.",
      },
      {
        id: "c",
        text: "Man kan endre på verdien en peker refererer til, men ikke uten å dereferere pekeren først.",
        isCorrect: true,
        explanation:
          "Riktig. For å endre verdien pekeren peker til, må man dereferere med * først: *ptr = nyVerdi.",
      },
      {
        id: "d",
        text: "Man kan ikke endre på adressen som er lagret i en peker.",
        isCorrect: false,
        explanation:
          "Feil. En vanlig (ikke-const) peker kan endre hvilken adresse den peker til. Bare const-pekere er låst til sin adresse.",
      },
    ],
  },

  // ─── KOPIERING ────────────────────────────────────────────────────────────

  {
    id: "v24v1-q8",
    variantGroupId: "kopiering-1",
    source: "V24V1",
    topic: "Kopiering",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `double* p1 = new double{3.14};
double* p2 = p1;
*p1 = 9.86;
*p2 = 1.77;`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Koden er et eksempel på dyp kopiering (deep copy).",
        isCorrect: false,
        explanation:
          "Feil. Dyp kopiering ville ha opprettet et nytt objekt i minnet. Her kopieres bare adressen, slik at p1 og p2 peker til samme objekt.",
      },
      {
        id: "b",
        text: "Koden er et eksempel på grunn kopiering (shallow copy).",
        isCorrect: true,
        explanation:
          "Riktig. p2 = p1 kopierer bare pekerens verdi (minneadressen), ikke selve double-verdien. Begge pekerne deler nå samme minnelokasjon.",
      },
      {
        id: "c",
        text: "Etter linje 4 peker p1 og p2 på samme verdier.",
        isCorrect: true,
        explanation:
          "Riktig. Siden p2 = p1 kopierer adressen, peker begge pekere på samme minnelokasjon. Etter linje 4 er verdien 1.77 på begge.",
      },
      {
        id: "d",
        text: "Etter linje 4 peker p1 og p2 på ulike objekt.",
        isCorrect: false,
        explanation:
          "Feil. Begge peker fortsatt på samme minnelokasjon – det er aldri opprettet noe nytt objekt.",
      },
    ],
  },

  {
    id: "v24v2-q10",
    variantGroupId: "kopiering-1",
    source: "V24V2",
    topic: "Kopiering",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `double* euler1 = new double{0.577};
double* euler2 = new double{*euler1};
*euler1 = 2.718;
*euler2 = 0.596;`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Koden er et eksempel på dyp kopiering (deep copy).",
        isCorrect: true,
        explanation:
          "Riktig. new double{*euler1} allokerer et nytt double-objekt og kopierer verdien fra *euler1. Euler2 peker på et helt separat objekt.",
      },
      {
        id: "b",
        text: "Koden er et eksempel på grunn kopiering (shallow copy).",
        isCorrect: false,
        explanation:
          "Feil. Grunn kopiering ville bare kopiert adressen. Her kopieres selve verdien til et nytt minneområde.",
      },
      {
        id: "c",
        text: "Etter linje 4 peker euler1 og euler2 på samme verdier.",
        isCorrect: false,
        explanation:
          "Feil. etter linje 4 inneholder *euler1 = 2.718 og *euler2 = 0.596 – de er ulike.",
      },
      {
        id: "d",
        text: "Etter linje 4 vil euler2 være en peker til en peker.",
        isCorrect: false,
        explanation:
          "Feil. euler2 er av typen double* – en vanlig peker til double. Den blir aldri en peker til peker.",
      },
    ],
  },

  {
    id: "custom-kopiering-1",
    variantGroupId: "kopiering-2",
    source: "Egenlaget",
    topic: "Kopiering",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `int* x = new int{42};
int* y = x;
int* z = new int{*x};
*x = 99;`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Etter linje 4 er verdien til *y lik 99.",
        isCorrect: true,
        explanation:
          "Riktig. y = x er en grunn kopiering – begge peker på samme minnelokasjon. Når *x endres til 99, ser y den samme endringen.",
      },
      {
        id: "b",
        text: "Etter linje 4 er verdien til *z lik 99.",
        isCorrect: false,
        explanation:
          "Feil. z peker på et separat minneobjekt opprettet med new int{*x}. Endringen av *x påvirker ikke *z.",
      },
      {
        id: "c",
        text: "z = x er et eksempel på dyp kopiering.",
        isCorrect: false,
        explanation:
          "Feil. z = x (peker-tilordning) er grunn kopiering – bare adressen kopieres. new int{*x} er derimot dyp kopiering.",
      },
      {
        id: "d",
        text: "new int{*x} er et eksempel på dyp kopiering.",
        isCorrect: true,
        explanation:
          "Riktig. new int{*x} allokerer ny minneplass og kopierer verdien fra *x inn der. z og x peker på separate objekter.",
      },
    ],
  },

  // ─── TILGANGSNIVÅ / FRIEND ────────────────────────────────────────────────

  {
    id: "v24v1-q9",
    variantGroupId: "tilgang-1",
    source: "V24V1",
    topic: "Tilgangsnivå og friend",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En funksjon merket som friend har tilgang til klassemedlemmer med tilgangsnivåene public, protected og private.",
        isCorrect: true,
        explanation:
          "Riktig. friend-deklarasjoner gir full tilgang til alle klassemedlemmer, uavhengig av tilgangsnivå.",
      },
      {
        id: "b",
        text: "En funksjon merket som friend i en baseklasse må overlastes i avledende klasser.",
        isCorrect: false,
        explanation:
          "Feil. friend-relasjoner arves ikke, men de trenger ikke overlastes. Friend-deklarasjoner er eksplisitte og gjelder per klasse.",
      },
      {
        id: "c",
        text: "En funksjon merket som friend kan ikke være medlem av noen klasse.",
        isCorrect: false,
        explanation:
          "Feil. En friend-funksjon kan godt være en medlemsfunksjon i en annen klasse. For eksempel kan MyClass::helper() deklareres som friend av AnotherClass.",
      },
      {
        id: "d",
        text: "friend-nøkkelordet kan bare brukes på operatorer som er overlastet.",
        isCorrect: false,
        explanation:
          "Feil. friend kan brukes på alle typer funksjoner og klasser, ikke bare overlastede operatorer.",
      },
    ],
  },

  {
    id: "v24v2-q11",
    variantGroupId: "tilgang-1",
    source: "V24V2",
    topic: "Tilgangsnivå og friend",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Abstrakte klasser kan ha medlemmer som er protected.",
        isCorrect: true,
        explanation:
          "Riktig. Abstrakte klasser kan ha alle typer tilgangsnivåer (public, protected, private). protected er spesielt nyttig for data som bare barneklasser skal ha tilgang til.",
      },
      {
        id: "b",
        text: "Et klassemedlem med tilgangsnivået protected kan bare aksesseres i filen den er deklarert.",
        isCorrect: false,
        explanation:
          "Feil. protected-medlemmer er tilgjengelige i klassen selv og i arvende klasser (barneklasser), uavhengig av hvilken fil de er i.",
      },
      {
        id: "c",
        text: "En funksjon med tilgangsnivået protected kan ikke overlastes.",
        isCorrect: false,
        explanation:
          "Feil. Tilgangsnivå og overlasting er uavhengige konsepter. protected-funksjoner kan overlastes på vanlig måte.",
      },
      {
        id: "d",
        text: "En funksjon med tilgangsnivået protected kan aksessere klassemedlemmer med tilgangsnivå private i foreldreklassen.",
        isCorrect: false,
        explanation:
          "Feil. private-medlemmer i foreldreklassen er ikke tilgjengelige i barneklassen, selv om barneklassens funksjoner er protected. private er strengt begrenset til selve klassen.",
      },
    ],
  },

  {
    id: "lf-q11",
    variantGroupId: "tilgang-2",
    source: "LF",
    topic: "Tilgangsnivå og friend",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Et predikat (boolsk objekt) kan ikke deklareres som en friend.",
        isCorrect: false,
        explanation:
          "Feil. Alle typer funksjoner, inkludert predikater, kan deklareres som friend.",
      },
      {
        id: "b",
        text: "friend-deklarasjoner gir tilgang til private klassemedlemmer.",
        isCorrect: true,
        explanation:
          "Riktig. Det er nettopp hensikten med friend – å gi spesifikke funksjoner eller klasser tilgang til private og protected medlemmer.",
      },
      {
        id: "c",
        text: "friend-deklarasjoner kan brukes til å overlaste output-operatoren.",
        isCorrect: true,
        explanation:
          "Riktig. Det er svært vanlig å deklarere operator<< som friend av en klasse, slik at den kan lese private data for utskrift.",
      },
      {
        id: "d",
        text: "Terminalen kan ikke skrive ut egendefinerte datatyper som er deklarert med friend.",
        isCorrect: false,
        explanation:
          "Feil. friend brukes nettopp for å tillate operator<< å aksessere private data, slik at egendefinerte typer kan skrives ut.",
      },
    ],
  },

  {
    id: "v25v1-q9",
    variantGroupId: "tilgang-3",
    source: "V25V1",
    topic: "Tilgangsnivå og friend",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Det er bare mulig å deklarere funksjoner til å være en 'friend' av en klasse mens klassen defineres.",
        isCorrect: false,
        explanation:
          "Feil. friend-deklarasjoner plasseres inne i klassekroppen, men de kan referere til funksjoner definert andre steder. Du deklarerer friend inne i klassen.",
      },
      {
        id: "b",
        text: "Bare funksjoner kan deklareres som en 'friend' av en klasse.",
        isCorrect: false,
        explanation:
          "Feil. Både funksjoner og hele klasser kan erklæres som friend. En friend-klasse får da tilgang til alle private/protected medlemmer.",
      },
      {
        id: "c",
        text: "En funksjon deklarert som 'friend' av en klasse kan aksessere medlemmer med 'protected' synlighet i klassen, men ikke 'private' synlighet.",
        isCorrect: false,
        explanation:
          "Feil. friend gir tilgang til ALLE private og protected medlemmer – ikke bare protected.",
      },
      {
        id: "d",
        text: "Det er mulig å deklarere overlastede operatorer som en 'friend' av en klasse.",
        isCorrect: true,
        explanation:
          "Riktig. Dette er faktisk et svært vanlig designmønster. operator<< og operator>> deklareres ofte som friend-funksjoner.",
      },
    ],
  },

  // ─── BEHOLDERE ────────────────────────────────────────────────────────────

  {
    id: "v24v1-q10",
    variantGroupId: "beholdere-1",
    source: "V24V1",
    topic: "Beholdere (STL)",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Elementene i et std::set er uordnet.",
        isCorrect: false,
        explanation:
          "Feil. std::set er sortert (ordnet) etter elementenes verdi ved hjelp av std::less som standard. For uordnet versjon bruker man std::unordered_set.",
      },
      {
        id: "b",
        text: "Det er ikke mulig å hente ut verdier av et std::set. Medlemsfunksjonen contains() kan brukes i stedet.",
        isCorrect: false,
        explanation:
          "Feil. Man kan iterere over et set og hente verdier. contains() sjekker bare om et element eksisterer – den gir ikke ut verdiene.",
      },
      {
        id: "c",
        text: "Man kan ikke bruke std::push_back() for å legge til et element i et std::set.",
        isCorrect: true,
        explanation:
          "Riktig. std::set har ikke push_back() siden den er sortert og elementer ikke har en fast rekkefølge. Man bruker insert() i stedet.",
      },
      {
        id: "d",
        text: "Et std::unordered_set har ikke duplikate verdier.",
        isCorrect: true,
        explanation:
          "Riktig. std::unordered_set tillater ikke duplikater – sett lagrer alltid unike elementer per definisjon.",
      },
    ],
  },

  {
    id: "v24v2-q12",
    variantGroupId: "beholdere-1",
    source: "V24V2",
    topic: "Beholdere (STL)",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte om std::vector?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Verdien returnert av size() overstiger aldri verdien returnert av capacity().",
        isCorrect: true,
        explanation:
          "Riktig. size() er antall faktiske elementer, capacity() er hvor mange elementer vektoren kan inneholde uten ny allokering. size() ≤ capacity() alltid.",
      },
      {
        id: "b",
        text: "push_back() endrer alltid både verdien returnert av size() og verdien returnert av capacity().",
        isCorrect: false,
        explanation:
          "Feil. push_back() øker alltid size(), men endrer capacity() bare når gjeldende kapasitet er full (da reallokeres minnet).",
      },
      {
        id: "c",
        text: "resize() endrer alltid både verdien returnert av size() og verdien returnert av capacity().",
        isCorrect: false,
        explanation:
          "Feil. resize() endrer size(), men endrer bare capacity() om ny størrelse overstiger gjeldende kapasitet.",
      },
      {
        id: "d",
        text: "emplace_back() kan endre verdien returnert av capacity().",
        isCorrect: true,
        explanation:
          "Riktig. emplace_back() kan utløse reallokering av vektoren om kapasiteten er full, noe som øker capacity().",
      },
    ],
  },

  // ─── TEMPLATES ────────────────────────────────────────────────────────────

  {
    id: "v24v1-q11",
    variantGroupId: "templates-1",
    source: "V24V1",
    topic: "Templates",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Templates stiller aldri krav til hvilke typer de aksepterer som argument.",
        isCorrect: false,
        explanation:
          "Feil. Templates kan ha implisitte krav gjennom operasjoner brukt i koden (duck typing). Concepts i C++20 gjør disse kravene eksplisitte.",
      },
      {
        id: "b",
        text: "Templates burde defineres i .cpp-filer for å unngå feil under linking.",
        isCorrect: false,
        explanation:
          "Feil. Template-definisjoner MÅ være i header-filer fordi kompilatoren trenger den fullstendige definisjonen for å instansiere templaten for ulike typer.",
      },
      {
        id: "c",
        text: "Kompilatoren kan automatisk bestemme verdien på template-parametere i noen tilfeller.",
        isCorrect: true,
        explanation:
          "Riktig. Template Argument Deduction lar kompilatoren automatisk utlede template-parametere fra funksjonsargumentene, f.eks. max(3, 5) gir automatisk max<int>(3, 5).",
      },
      {
        id: "d",
        text: "Det er mulig å deklarere funksjoner som templates, men da må de være medlemsfunksjoner.",
        isCorrect: false,
        explanation:
          "Feil. Templates kan brukes på både frie funksjoner og medlemsfunksjoner.",
      },
    ],
  },

  {
    id: "v25v2-q10",
    variantGroupId: "templates-1",
    source: "V25V2",
    topic: "Templates",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Templates kan ta inn mer enn ett parameter.",
        isCorrect: true,
        explanation:
          "Riktig. Templates kan ha multiple type- og ikke-type parametere, f.eks. template<typename T, typename U, int N>.",
      },
      {
        id: "b",
        text: "Templates kan ta et heltall som template-parameter.",
        isCorrect: true,
        explanation:
          "Riktig. Ikke-type template-parametere som heltall er tillatt. std::array<int, 10> bruker for eksempel et heltall (10) som template-parameter.",
      },
      {
        id: "c",
        text: "std::vector og std::set er eksempler på klasser som benytter templates.",
        isCorrect: true,
        explanation:
          "Riktig. std::vector<T> og std::set<T> er klasse-templates der T er element-typen.",
      },
      {
        id: "d",
        text: "Funksjoner som benytter templates bør defineres i en header fil.",
        isCorrect: true,
        explanation:
          "Riktig. Template-instansiering skjer ved kompilering. Kompilatoren trenger den fullstendige template-definisjonen i header-filen for å generere kode for hver type.",
      },
    ],
  },

  // ─── GUI / ANIMATIONWINDOW ────────────────────────────────────────────────

  {
    id: "v24v1-q12",
    variantGroupId: "gui-1",
    source: "V24V1",
    topic: "GUI og AnimationWindow",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En AnimationWindow Widget er et grafisk element man kan interagere med.",
        isCorrect: true,
        explanation:
          "Riktig. Widgets i AnimationWindow er interaktive grafiske elementer som knapper, sliders, etc.",
      },
      {
        id: "b",
        text: "En callback-funksjon må returnere void og kan ikke ha parametere.",
        isCorrect: true,
        explanation:
          "Riktig. AnimationWindow callback-funksjoner har signaturen void(). De tar ingen parametere og returnerer ingenting.",
      },
      {
        id: "c",
        text: "Siste parameter i callback-funksjonen er valgfritt og er en streng som skal beskrive en AnimationWindow Widget.",
        isCorrect: false,
        explanation:
          "Feil. Callback-funksjoner tar ingen parametere. Det er callback-registreringen (f.eks. cb_when_clicked) som tar inn widgeten som argument.",
      },
      {
        id: "d",
        text: "En AnimationWindow Widget kan ha flere tilhørende callback-funksjoner.",
        isCorrect: false,
        explanation:
          "Feil. En Widget er typisk koblet til én callback-funksjon per hendelse.",
      },
    ],
  },

  // ─── KONSTRUKTØRER ────────────────────────────────────────────────────────

  {
    id: "v25v1-q5",
    variantGroupId: "konstruktorer-1",
    source: "V25V1",
    topic: "Konstruktører",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En barne-klasse til en klasse som kun har en konstruktør med ikke-standard parametere, må kalle foreldrekonstruktøren eksplisitt.",
        isCorrect: true,
        explanation:
          "Riktig. Hvis foreldreklassen ikke har en default-konstruktør (uten parametere), må barneklassen eksplisitt kalle foreldreklassens konstruktør i initialiseringslisten.",
      },
      {
        id: "b",
        text: "Etter at konstruktøren er kalt, er det ikke lenger mulig å endre verdien av medlemsvariabler merket med 'const' i den instansen av objektet.",
        isCorrect: true,
        explanation:
          "Riktig. const-medlemsvariabler kan kun settes i konstruktørens initialiseringsliste og kan ikke endres etterpå.",
      },
      {
        id: "c",
        text: "En klasse kan bare ha én konstruktør.",
        isCorrect: false,
        explanation:
          "Feil. C++ støtter konstruktøroverbelastning – en klasse kan ha mange konstruktører med ulike signaturer.",
      },
      {
        id: "d",
        text: "En konstruktør må ha offentlig (public) synlighet.",
        isCorrect: false,
        explanation:
          "Feil. Konstruktører kan ha private synlighet (f.eks. Singleton-mønsteret) eller protected synlighet (f.eks. abstrakte klasser).",
      },
    ],
  },

  {
    id: "v25v2-q6",
    variantGroupId: "konstruktorer-1",
    source: "V25V2",
    topic: "Konstruktører",
    stem: "Se på klassedeklarasjonen under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `class Member {
    string name;
    string surname;
    int age;
    Member() : name{"Somebody"}, surname{"OfSomebody"}, age{100} {}
    Member(int _age, string _name, string _surname)
        : name{_name}, surname{_surname}, age{_age} {}
    Member(const Member &m)
        : name{m.name}, surname{m.surname}, age{m.age} {}
};`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Member klassen har en kopikonstruktør.",
        isCorrect: true,
        explanation:
          "Riktig. Den tredje konstruktøren Member(const Member &m) er en kopikonstruktør – den tar en konstant referanse til et annet Member-objekt.",
      },
      {
        id: "b",
        text: "Det er umulig å lage en instans av Member klassen, fordi ingen av dens konstruktører kan kalles.",
        isCorrect: false,
        explanation:
          "Feil. Selv om alle konstruktørene er private (klassen bruker private som standard), er det mulig å lage instanser fra innsiden av klassen (f.eks. via factory methods).",
      },
      {
        id: "c",
        text: "Member klassen har en konstruktør med parametere som har standardverdier.",
        isCorrect: false,
        explanation:
          "Feil. Ingen av konstruktørene bruker default-parametere (= verdi). Konstruktørene har enten ingen parametere eller påkrevde parametere.",
      },
      {
        id: "d",
        text: "Member klassen har en default konstruktør.",
        isCorrect: true,
        explanation:
          "Riktig. Member() uten parametere er en default-konstruktør (kalt uten argumenter).",
      },
    ],
  },

  // ─── MINNE ────────────────────────────────────────────────────────────────

  {
    id: "v25v1-q3",
    variantGroupId: "minne-1",
    source: "V25V1",
    topic: "Minnehåndtering",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `class A {
    int* a = nullptr;
public:
    A() {
        a = new int{100};
    }
    A(unsigned int n) {
        a = new int{n};
    }
    ~A() {
        delete[] a;
    }
};

void f() {
    A instance;
    throw std::runtime_error("Oh noes! :(");
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Linjen hvor det står delete[] a; bør omskrives til delete a;",
        isCorrect: true,
        explanation:
          "Riktig. a ble allokert med new int{...} (enkelt objekt, ikke array). Bruk av delete[] for ikke-array er udefinert atferd. Riktig er delete a;",
      },
      {
        id: "b",
        text: "Ethvert kall til f() forårsaker en minnelekkasje.",
        isCorrect: false,
        explanation:
          "Feil. A har en destruktør, og RAII sikrer at ~A() kalles under stack unwinding når unntaket kastes. Minnet frigjøres korrekt.",
      },
      {
        id: "c",
        text: "Destruktøren til A må kalles eksplisitt når en instans av A går ut av skop.",
        isCorrect: false,
        explanation:
          "Feil. Destruktøren kalles automatisk for stakk-allokerte objekter når de går ut av skop.",
      },
      {
        id: "d",
        text: "Å lage en instans av class A forårsaker alltid en minnelekkasje (memory leak).",
        isCorrect: false,
        explanation:
          "Feil. A har en destruktør (~A()) som (bør) frigjøre minnet. Med riktig bruk av delete (ikke delete[]) frigjøres minnet korrekt.",
      },
    ],
  },

  {
    id: "lf-q6",
    variantGroupId: "minne-2",
    source: "LF",
    topic: "Minnehåndtering",
    stem: "Se på koden under.\n\nKoden er et eksempel på...",
    code: `int* values = new int[3] {1, 2, 3};
for (int i = 0; i < 3; i++) {
    delete[] values;
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Minnelekkasje",
        isCorrect: false,
        explanation:
          "Feil. Minnet slettes (delete[] kalles), så det er ikke en minnelekkasje.",
      },
      {
        id: "b",
        text: "Dinglende referanse (dangling reference)",
        isCorrect: false,
        explanation:
          "Feil. En dangling pointer/reference oppstår når man bruker en peker etter sletting. Her er problemet at delete[] kalles flere ganger.",
      },
      {
        id: "c",
        text: "Dobbel tom (double free)",
        isCorrect: true,
        explanation:
          "Riktig. delete[] values kalles 3 ganger i løkken, men minnet ble bare allokert én gang. Double free er udefinert atferd og kan krasje programmet.",
      },
      {
        id: "d",
        text: "Dereferering av nullpeker",
        isCorrect: false,
        explanation:
          "Feil. values er ikke null, og koden prøver ikke å dereferere noen nullpeker.",
      },
    ],
  },

  {
    id: "lf-q7a",
    variantGroupId: "smartpekere-1",
    source: "LF",
    topic: "Smartpekere",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `#include <memory>

std::unique_ptr<Book> createBook() {
    std::unique_ptr<Book> book = new Book();
    return book;
}

int func() {
    {
        auto cppBook = createBook();
    }
    return 0;
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Både book og cppBook er allokert på stack.",
        isCorrect: false,
        explanation:
          "Feil. Det faktiske Book-objektet er allokert på heap (via unique_ptr). unique_ptr-objektet selv er på stack.",
      },
      {
        id: "b",
        text: "book er allokert i heap, mens cppBook er allokert på stack.",
        isCorrect: false,
        explanation:
          "Feil. Begge unique_ptr-objektene er på stack. Det er Book-objektet de eier som er på heap.",
      },
      {
        id: "c",
        text: "Når func() returnerer er minnet som ble allokert til cppBook deallokert.",
        isCorrect: true,
        explanation:
          "Riktig. cppBook er en unique_ptr på stack. Når den går ut av sitt indre skop (blokken {}), kalles destruktøren og heap-minnet frigjøres.",
      },
      {
        id: "d",
        text: "Koden inneholder en minnelekkasje.",
        isCorrect: false,
        explanation:
          "Feil. unique_ptr sørger automatisk for at minnet frigjøres via RAII.",
      },
    ],
  },

  {
    id: "v25v2-q11",
    variantGroupId: "heap-stack-1",
    source: "V25V2",
    topic: "Heap og stack",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Innholdet i en std::vector blir alltid allokert på heapen.",
        isCorrect: true,
        explanation:
          "Riktig. std::vector lagrer elementene sine på heap-minne (dynamisk minne), selv om vector-objektet selv kan ligge på stakken.",
      },
      {
        id: "b",
        text: "Smartpekere skal ikke brukes til å referere til verdier som er allokert på stakken.",
        isCorrect: true,
        explanation:
          "Riktig. Smartpekere (unique_ptr, shared_ptr) er designet for heap-allokerte objekter. Å bruke dem på stakk-objekter vil føre til double-free.",
      },
      {
        id: "c",
        text: "new operatoren allokerer minne på heapen.",
        isCorrect: true,
        explanation:
          "Riktig. new allokerer alltid minne på heap (dynamisk minne) og returnerer en peker til det allokerte minnet.",
      },
      {
        id: "d",
        text: "Innholdet i et std::array blir alltid allokert på heapen.",
        isCorrect: false,
        explanation:
          "Feil. std::array er en stakk-allokert container med fast størrelse. Elementene lagres direkte i array-objektet på stakken.",
      },
    ],
  },

  {
    id: "v25v1-q6",
    variantGroupId: "heap-stack-1",
    source: "V25V1",
    topic: "Heap og stack",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Medlemsvariabler for objekter lagres alltid på stakken.",
        isCorrect: false,
        explanation:
          "Feil. Hvis objektet er allokert på heap (med new), lagres også dets medlemsvariabler på heap.",
      },
      {
        id: "b",
        text: "Destruktøren til et objekt kalles når en instans på stakken havner utenfor skopet.",
        isCorrect: true,
        explanation:
          "Riktig. Stakk-allokerte objekter destrueres automatisk (RAII) når de går ut av sitt skop.",
      },
      {
        id: "c",
        text: "Destruktøren til et objekt kalles når en rå peker til en heap-allokert instans går ut av skopet.",
        isCorrect: false,
        explanation:
          "Feil. Rå pekere kaller ikke destruktøren automatisk. Man må eksplisitt kalle delete på pekeren for å frigjøre heap-minnet.",
      },
      {
        id: "d",
        text: "Pekere kan bare referere til heap-allokerte data.",
        isCorrect: false,
        explanation:
          "Feil. Pekere kan peke til data på både stakken og heap. For eksempel er int x = 5; int* p = &x; en gyldig stakk-peker.",
      },
    ],
  },

  // ─── ABSTRAKTE KLASSER ────────────────────────────────────────────────────

  {
    id: "v25v1-q8",
    variantGroupId: "abstrakte-1",
    source: "V25V1",
    topic: "Abstrakte klasser",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En abstrakt klasse kan arve fra en ikke-abstrakt klasse.",
        isCorrect: true,
        explanation:
          "Riktig. Det er fullt lovlig for en abstrakt klasse å arve fra en konkret (ikke-abstrakt) klasse.",
      },
      {
        id: "b",
        text: "En klasse som arver fra en abstrakt klasse, men ikke overstyrer noen metoder, er også en abstrakt klasse.",
        isCorrect: true,
        explanation:
          "Riktig. Hvis en barneklasse ikke implementerer alle rene virtuelle metoder fra foreldreklassen, er barneklassen fortsatt abstrakt.",
      },
      {
        id: "c",
        text: "En abstrakt klasse må ha en ikke-default konstruktør.",
        isCorrect: false,
        explanation:
          "Feil. Abstrakte klasser kan godt ha default-konstruktører eller ingen konstruktør i det hele tatt.",
      },
      {
        id: "d",
        text: "En ikke-abstrakt klasse kan arve fra en abstrakt klasse.",
        isCorrect: true,
        explanation:
          "Riktig. Det er nettopp hensikten med abstrakte klasser – å definere et grensesnitt som konkrete barneklasser implementerer.",
      },
    ],
  },

  {
    id: "v25v2-q9",
    variantGroupId: "arv-1",
    source: "V25V2",
    topic: "Arv og abstrakte klasser",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En instans av en foreldreklasse kan konverteres til en barneklasse, uten å ha behov for å bruke static_cast<>().",
        isCorrect: false,
        explanation:
          "Feil. Nedkonvertering (foreldreklasse → barneklasse) er ikke implisitt. Du trenger dynamic_cast eller static_cast, og det er generelt usikkert.",
      },
      {
        id: "b",
        text: "Når 'class A' arver fra 'class B', og 'class B' arver fra 'class C', vil 'class A' ha tilgang til alle public og protected medlemsvariabler fra både 'class B' og 'class C'. private medlemsvariabler arves teknisk sett, men er ikke direkte tilgjengelige i den arvende klassen.",
        isCorrect: true,
        explanation:
          "Riktig. Arv er transitiv: A arver fra B som arver fra C. A har tilgang til alle public og protected medlemsvariabler fra B og C. private medlemsvariabler er teknisk sett til stede i objektet, men ikke direkte tilgjengelige uten getter/setter.",
      },
      {
        id: "c",
        text: "En abstrakt klasse må ha minst en funksjon som er helvirtuell.",
        isCorrect: true,
        explanation:
          "Riktig. En klasse er abstrakt nettopp fordi den har minst én ren virtuell funksjon (= 0).",
      },
      {
        id: "d",
        text: "Kompilatoren rapporterer en feil når en barneklasse definerer en metode med samme navn, parametere, og returtype som en i foreldreklassen.",
        isCorrect: false,
        explanation:
          "Feil. Dette er gyldig overriding. Kompilatoren vil bare rapportere feil om du bruker override-nøkkelordet feil, ikke for lovlig overriding.",
      },
    ],
  },

  // ─── DEKLARASJON vs DEFINISJON ────────────────────────────────────────────

  {
    id: "v25v1-q10",
    variantGroupId: "dekl-def-1",
    source: "V25V1",
    topic: "Deklarasjon og definisjon",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Rekkefølgen funksjoner deklareres i har ingen betydning, så lenge hver funksjon er deklarert før den blir brukt.",
        isCorrect: true,
        explanation:
          "Riktig. Kompilatoren behandler kode fra topp til bunn, men trenger bare en deklarasjon (ikke definisjon) før en funksjon brukes.",
      },
      {
        id: "b",
        text: "Bare én deklarasjon av en gitt funksjon kan eksistere blant alle .cpp og .h filene i et prosjekt.",
        isCorrect: false,
        explanation:
          "Feil. En funksjon kan deklareres mange ganger (i ulike header-filer som inkluderer samme header). Bare definisjoner er begrenset av ODR.",
      },
      {
        id: "c",
        text: "Bare én definisjon av en gitt funksjon kan eksistere blant alle .cpp filene i et prosjekt.",
        isCorrect: true,
        explanation:
          "Riktig. One Definition Rule (ODR) i C++ krever at det bare finnes én definisjon av en funksjon på tvers av alle kompileringsenheter.",
      },
      {
        id: "d",
        text: "En .cpp fil kan ikke inneholde definisjoner. Alle definisjoner må plasseres i header filer.",
        isCorrect: false,
        explanation:
          "Feil. Definisjoner plasseres typisk i .cpp-filer. Header-filer inneholder deklarasjoner (med unntak av inline og template).",
      },
    ],
  },

  {
    id: "v25v2-q5",
    variantGroupId: "dekl-def-1",
    source: "V25V2",
    topic: "Deklarasjon og definisjon",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `int b(int n);

int a(int n) {
    return b(n);
}

int b(int n) {
    return 42 * n;
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Det er bare nødvendig å legge funksjonsdefinisjonen i en header fil for å kunne bruke de i flere C++ kildefiler.",
        isCorrect: false,
        explanation:
          "Feil. Funksjonsdefinisjoner plasseres typisk i .cpp-filer. For å bruke funksjoner i flere kildefiler inkluderer man header-filer med deklarasjoner.",
      },
      {
        id: "b",
        text: "Funksjonen a() kan kalle funksjonen b(), fordi b() er deklarert før a() er definert.",
        isCorrect: true,
        explanation:
          "Riktig. Linje 1 er en fremoverdeklarasjon av b(). Fordi b() er deklarert før a() defineres, vet kompilatoren at b() finnes når den kompilerer a().",
      },
      {
        id: "c",
        text: "Programmet kompilerer ikke fordi a() er ikke deklarert.",
        isCorrect: false,
        explanation:
          "Feil. a() trenger ikke en fremoverdeklarasjon her fordi ingenting bruker a() før den er definert.",
      },
      {
        id: "d",
        text: "Programmet kompilerer fortsatt når definisjonene av a() og b() byttes.",
        isCorrect: true,
        explanation:
          "Riktig. Selv om b() defineres først og a() sist, er b() fortsatt deklarert på linje 1. a() kan dermed kalle b().",
      },
    ],
  },

  {
    id: "v24v2-q3",
    variantGroupId: "dekl-def-2",
    source: "V24V2",
    topic: "Deklarasjon og definisjon",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En klasse kan deklareres flere ganger.",
        isCorrect: true,
        explanation:
          "Riktig. En klasse kan deklareres (forward declaration) mange ganger i ulike filer uten problemer.",
      },
      {
        id: "b",
        text: "En funksjon kan deklareres flere ganger.",
        isCorrect: true,
        explanation:
          "Riktig. Funksjonsdeklarasjoner (prototyper) kan forekomme mange ganger. Det er bare definisjoner som er begrenset til én (ODR).",
      },
      {
        id: "c",
        text: "En medlemsfunksjon kan defineres flere ganger.",
        isCorrect: false,
        explanation:
          "Feil. One Definition Rule (ODR) forbyr flere definisjoner av samme funksjon i samme program.",
      },
      {
        id: "d",
        text: "En funksjon kan defineres flere ganger, men bare én gang i hver .cpp-fil.",
        isCorrect: false,
        explanation:
          "Feil. En funksjon kan kun ha én definisjon totalt i hele programmet, ikke én per .cpp-fil.",
      },
    ],
  },

  // ─── TYPEKONVERTERING ─────────────────────────────────────────────────────

  {
    id: "v24v2-q2",
    variantGroupId: "typekonv-1",
    source: "V24V2",
    topic: "Typekonvertering",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Man kan alltid gjøre eksplisitt typekonvertering heller enn implisitt typekonvertering.",
        isCorrect: true,
        explanation:
          "Riktig. Eksplisitt cast (static_cast, reinterpret_cast, etc.) kan alltid brukes i stedet for implisitt konvertering.",
      },
      {
        id: "b",
        text: "Man kan konvertere en float til en int uten tap av presisjon.",
        isCorrect: false,
        explanation:
          "Feil. Konvertering fra float til int avkorter desimaldelen. 3.9f → 3. Det er alltid tap av presisjon.",
      },
      {
        id: "c",
        text: "Man kan alltid konvertere en unsigned char til en char uten tap av presisjon.",
        isCorrect: false,
        explanation:
          "Feil. unsigned char har verdier 0-255. char kan være signed (typisk -128 til 127). Verdier over 127 vil fortegns-konverteres og gi uventede resultater.",
      },
      {
        id: "d",
        text: "Konvertering fra en int til en float kan gjøres implisitt.",
        isCorrect: true,
        explanation:
          "Riktig. C++ konverterer automatisk int til float i uttrykk der de blandes (implicit widening conversion).",
      },
    ],
  },

  // ─── LØKKER ───────────────────────────────────────────────────────────────

  {
    id: "v25v1-q12",
    variantGroupId: "lokker-1",
    source: "V25V1",
    topic: "Løkker",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "continue betyr avbryt nåværende løkke-iterasjon og gå rett til neste iterasjon.",
        isCorrect: true,
        explanation:
          "Riktig. continue hopper over resten av løkkekroppen i gjeldende iterasjon og starter neste iterasjon.",
      },
      {
        id: "b",
        text: "En for-løkke kjører alltid minst en iterasjon.",
        isCorrect: false,
        explanation:
          "Feil. Betingelsen i for-løkken evalueres FØR første iterasjon. for(int i = 0; i < 0; i++) kjører aldri.",
      },
      {
        id: "c",
        text: "Alle while-løkker kan omskrives til en ekvivalent for-løkke, og alle for-løkker kan omskrives til en ekvivalent while-løkke.",
        isCorrect: true,
        explanation:
          "Riktig. for og while er uttryksmessig likeverdige – ethvert program skrevet med én kan skrives med den andre.",
      },
      {
        id: "d",
        text: "En while-løkke kjører alltid minst en iterasjon.",
        isCorrect: false,
        explanation:
          "Feil. while-løkken sjekker betingelsen FØR kroppen kjøres. Det er do-while som garanterer minst én iterasjon.",
      },
    ],
  },

  // ─── TILFELDIGE TALL ──────────────────────────────────────────────────────

  {
    id: "v25v2-q3",
    variantGroupId: "random-1",
    source: "V25V2",
    topic: "Tilfeldige tall",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `std::random_device device;
std::default_random_engine engine{0};
std::uniform_int_distribution<int> diceDistribution(0, 20);

for(long long i = 0; i < 100; i++) {
    std::cout << "Your roll for initiative was: "
              << diceDistribution(engine)+1 << std::endl;
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Hvis vi øker øvre grense for i til å være tilstrekkelig stor, vil sekvensen av tilfeldige terningkast til slutt gjenta seg fullstendig.",
        isCorrect: true,
        explanation:
          "Riktig. Pseudo-tilfeldige tallgeneratorer (PRNG) som std::default_random_engine har en endelig tilstand og vil til slutt repetere sekvensen (periodisk).",
      },
      {
        id: "b",
        text: "De tilfeldige tallene som skrives ut av dette programmet er forskjellige hver gang programmet kjøres, men hvis du vet det siste tallet som skrives ut av programmet, kan du forutsi det neste eksakt.",
        isCorrect: false,
        explanation:
          "Feil. engine er seeded med 0 (et fast tall), ikke std::random_device. Dermed er sekvensen nøyaktig den samme hver gang programmet kjøres.",
      },
      {
        id: "c",
        text: "For dette eksemplet burde en std::uniform_real_distribution ha blitt brukt i stedet.",
        isCorrect: false,
        explanation:
          "Feil. For terningkast (heltall) er std::uniform_int_distribution passende. real_distribution gir desimaltall.",
      },
      {
        id: "d",
        text: "De tilfeldige tallene som skrives ut av dette programmet er alltid de samme.",
        isCorrect: true,
        explanation:
          "Riktig. engine er seeded med det faste tallet 0. Dermed vil det alltid genereres nøyaktig samme sekvens av 'tilfeldige' tall.",
      },
    ],
  },

  // ─── KOMPILATORDIREKTIVER ─────────────────────────────────────────────────

  {
    id: "v25v2-q8",
    variantGroupId: "direktivet-1",
    source: "V25V2",
    topic: "Kompilatordirektiver",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "#include direktivet bare legger inn alle deklarasjonene fra filen som er gitt som parameter inn i filen som blir kompilert.",
        isCorrect: false,
        explanation:
          "Feil. #include kopierer HELE innholdet fra den oppgitte filen (ikke bare deklarasjoner). Det er en tekstlig erstatning utført av preprosessoren.",
      },
      {
        id: "b",
        text: "#include direktivet kopierer hele innholdet fra den oppgitte filen inn i filen som blir kompilert.",
        isCorrect: true,
        explanation:
          "Riktig. Preprosessoren erstatter #include-direktivet med hele innholdet av den inkluderte filen.",
      },
      {
        id: "c",
        text: "#pragma once direktivet unngår lenkefeil.",
        isCorrect: false,
        explanation:
          "Feil. #pragma once forhindrer at samme header inkluderes flere ganger i én kompileringsenhet (unngår flerdefinisjonsfeil i kompileringsfasen). Det løser ikke lenkefeil.",
      },
      {
        id: "d",
        text: "#pragma once direktivet unngår flerdefinisjonsfeil (multiple definition errors).",
        isCorrect: true,
        explanation:
          "Riktig. #pragma once sikrer at en header bare inkluderes én gang per kompileringsenhet, og unngår dermed flerdefinisjonsfeil som oppstår ved gjentatt inkludering.",
      },
    ],
  },

  // ─── CONSTEXPR / FUNKSJONER ───────────────────────────────────────────────

  {
    id: "lf-q2",
    variantGroupId: "constexpr-1",
    source: "LF",
    topic: "constexpr og funksjoner",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekt?",
    code: `constexpr int increment = 1;

constexpr int incrementValue(int value) { return value + increment; };

constexpr void func() {
    int v1 = 10;
    int v2 = incrementValue(v1);
    constexpr int v3 = incrementValue(1);
    constexpr int v4 = v3 + 3;
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Funksjonen incrementValue() har ingen bivirkninger (side effects).",
        isCorrect: true,
        explanation:
          "Riktig. incrementValue() leser bare inputverdiene og increment, og returnerer et resultat. Den endrer ingen global tilstand.",
      },
      {
        id: "b",
        text: "Kallet til funksjonen incrementValue() i linje 7 vil evalueres ved kompileringstid.",
        isCorrect: false,
        explanation:
          "Feil. v2 er ikke deklarert constexpr, og v1 er ikke en konstant. Kallet kan ikke garanteres evaluert ved kompilering.",
      },
      {
        id: "c",
        text: "Kallet til funksjonen incrementValue() i linje 8 vil evalueres ved kompileringstid.",
        isCorrect: true,
        explanation:
          "Riktig. v3 er deklarert constexpr og incrementValue(1) kalles med et konstant argument. Kompilatoren MÅ evaluere dette ved kompileringstid.",
      },
      {
        id: "d",
        text: "Variabelen v4 vil evalueres ved kjøretid.",
        isCorrect: false,
        explanation:
          "Feil. v4 er deklarert constexpr og v3 er constexpr. v4 = v3 + 3 evalueres ved kompileringstid.",
      },
    ],
  },

  // ─── VARIABELDEKLARASJONER ────────────────────────────────────────────────

  {
    id: "lf-q1",
    variantGroupId: "vardekl-1",
    source: "LF",
    topic: "Variabeldeklarasjoner",
    stem: "Hva må minimum presiseres ved en variabeldeklarasjon?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Datatype",
        isCorrect: true,
        explanation:
          "Riktig. En variabeldeklarasjon trenger en type (f.eks. int, double) for at kompilatoren skal vite hvor mye minne som skal reserveres.",
      },
      {
        id: "b",
        text: "Navn",
        isCorrect: true,
        explanation:
          "Riktig. En variabeldeklarasjon trenger et navn slik at man kan referere til variabelen i koden.",
      },
      {
        id: "c",
        text: "Verdi",
        isCorrect: false,
        explanation:
          "Feil. En variabel trenger ikke initialiseres ved deklarasjonen. int x; er en gyldig deklarasjon uten initiell verdi.",
      },
      {
        id: "d",
        text: "Navnerom (namespace)",
        isCorrect: false,
        explanation:
          "Feil. Navnerom er valgfritt. Variabler kan deklareres uten å tilhøre noe eksplisitt navnerom (de havner da i globalt skop eller lokalt skop).",
      },
    ],
  },

  // ─── EGENDEFINERTE TYPER ──────────────────────────────────────────────────

  {
    id: "lf-q4",
    variantGroupId: "egentyper-1",
    source: "LF",
    topic: "Egendefinerte typer",
    stem: "Hvilke (en eller flere) av følgende alternativ er en egendefinert type?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En enum",
        isCorrect: true,
        explanation:
          "Riktig. enum (og enum class) er en egendefinert type som definerer et sett med navngitte konstanter.",
      },
      {
        id: "b",
        text: "En struct",
        isCorrect: true,
        explanation:
          "Riktig. struct er en egendefinert type (datastruktur) som samler relaterte variabler.",
      },
      {
        id: "c",
        text: "En enum-klasse",
        isCorrect: true,
        explanation:
          "Riktig. enum class (scoped enum) er en modernisert, typesikker versjon av enum – en egendefinert type.",
      },
      {
        id: "d",
        text: "En abstrakt klasse",
        isCorrect: true,
        explanation:
          "Riktig. En abstrakt klasse er en egendefinert type. Den brukes som et grensesnitt som andre klasser implementerer.",
      },
    ],
  },

  // ─── VERDIER OG UINITALISERTE VARIABLER ──────────────────────────────────

  {
    id: "v25v2-q12",
    variantGroupId: "uinit-verdier-1",
    source: "V25V2",
    topic: "Verdier og initialisering",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `struct B { int b; };

int C(int c = 5) { return c; }

int main(int argc, char** argv) {
    int a;
    std::cout << a << std::endl;         // linje 6

    B instance;
    std::cout << instance.b << std::endl; // linje 9

    int c = C();
    std::cout << c << std::endl;         // linje 12

    std::cout << argc << std::endl;      // linje 14
    return 0;
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Gitt at programmet er kjørt uten kommandolinjeparametere, er verdien til argc som skrives ut på linje 14 ikke kjent på forhånd.",
        isCorrect: false,
        explanation:
          "Feil. Uten kommandolinjeparametere er argc alltid 1 (programnavnet teller som ett argument). Dette er kjent på forhånd.",
      },
      {
        id: "b",
        text: "Verdien til c som skrives ut på linje 12 er ikke kjent på forhånd.",
        isCorrect: false,
        explanation:
          "Feil. C() kalles uten argument, så default-verdien 5 brukes. c = C() = 5. Verdien er kjent på forhånd.",
      },
      {
        id: "c",
        text: "Verdien til instance.b som skrives ut på linje 9 er ikke kjent på forhånd.",
        isCorrect: true,
        explanation:
          "Riktig. struct B har et ikke-initialisert int-felt b. Verdien er udefinert (indeterminate value) og ikke kjent på forhånd.",
      },
      {
        id: "d",
        text: "Verdien til a som skrives ut på linje 6 er ikke kjent på forhånd.",
        isCorrect: true,
        explanation:
          "Riktig. int a; deklarerer a uten initialisering. Verdien er udefinert og kan være hva som helst – lesing av den er undefined behavior.",
      },
    ],
  },

  // ─── TVILLINGSPØRSMÅL ────────────────────────────────────────────────────

  // kompilering-linking-2 twin
  {
    id: "tw-kl2",
    variantGroupId: "kompilering-linking-2",
    source: "Egenlaget",
    topic: "Kompilering og linking",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Preprosessoren kjøres etter kompilatoren og behandler #include-direktiver.",
        isCorrect: false,
        explanation: "Feil. Preprosessoren kjøres FØR kompilatoren. Den behandler #include, #define og andre direktiver som et tekstlig substitusjonsteg.",
      },
      {
        id: "b",
        text: "En objektfil (.o) inneholder maskinkode, men er ikke et ferdig kjørbart program i seg selv.",
        isCorrect: true,
        explanation: "Riktig. Kompilatoren produserer objektfiler med maskinkode, men linkeren må sette dem sammen til en kjørbar fil og løse symbolreferanser.",
      },
      {
        id: "c",
        text: "C++ krever at alle funksjoner som kalles i main() er definert i main.cpp.",
        isCorrect: false,
        explanation: "Feil. Funksjoner kan defineres i hvilken som helst .cpp-fil. Linkeren kobler kall til definisjoner på tvers av kompileringsenheter.",
      },
      {
        id: "d",
        text: "En lenkefeil kan oppstå dersom en funksjon er deklarert i en header, men aldri definert i noen .cpp-fil.",
        isCorrect: true,
        explanation: "Riktig. Linkeren finner ikke definisjonen og rapporterer et 'undefined reference'-feil. Deklarasjon alene er ikke nok.",
      },
    ],
  },

  // kompilering-linking-3 twin
  {
    id: "tw-kl3",
    variantGroupId: "kompilering-linking-3",
    source: "Egenlaget",
    topic: "Kompilering og linking",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En header-fil inkludert av to ulike .cpp-filer kompileres bare én gang totalt for hele prosjektet.",
        isCorrect: false,
        explanation: "Feil. Hver .cpp-fil (kompileringsenhet) kompilerer inkluderte headerfiler selvstendig. Den samme headerfilen kan dermed kompileres mange ganger.",
      },
      {
        id: "b",
        text: "Fremoverdeklarasjoner (forward declarations) lar deg referere til en funksjon i kode uten å inkludere dens definisjon.",
        isCorrect: true,
        explanation: "Riktig. En fremoverdeklarasjon gir kompilatoren nok informasjon til å validere kall. Definisjonen kan komme senere i samme fil eller i en annen kompileringsenhet.",
      },
      {
        id: "c",
        text: "Innlinjefunksjoner (inline) bør defineres i header-filer fordi kompilatoren trenger definisjonen i hver kompileringsenhet.",
        isCorrect: true,
        explanation: "Riktig. For å inline en funksjon må kompilatoren se hele definisjonen der funksjonen kalles. Inline-funksjoner er unntatt ODR og kan defineres i headers.",
      },
      {
        id: "d",
        text: "#pragma once og include-guards (#ifndef / #define / #endif) er to likeverdige metoder for å unngå at en header inkluderes flere ganger i én kompileringsenhet.",
        isCorrect: true,
        explanation: "Riktig. Begge mekanismene forhindrer dobbel-inkludering. #pragma once er enklere å skrive, mens include-guards er mer portabelt.",
      },
    ],
  },

  // datatyper-2 twin
  {
    id: "tw-dt2",
    variantGroupId: "datatyper-2",
    source: "Egenlaget",
    topic: "Datatyper",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "I C++ er struct og class nesten identiske – den eneste forskjellen er at standardsynligheten er public i struct og private i class.",
        isCorrect: true,
        explanation: "Riktig. Utover standardsynligheten (og standard-arvetypen) er struct og class teknisk sett identiske i C++.",
      },
      {
        id: "b",
        text: "En struct i C++ kan ikke ha konstruktører eller destruktører.",
        isCorrect: false,
        explanation: "Feil. En struct i C++ kan ha konstruktører, destruktører, medlemsfunksjoner og arv – akkurat som en class.",
      },
      {
        id: "c",
        text: "En struct kan arve fra en annen struct.",
        isCorrect: true,
        explanation: "Riktig. Arv fungerer for struct akkurat som for class. Standardarvetype for struct er public, mens det for class er private.",
      },
      {
        id: "d",
        text: "'enum class' gir sterkere typesikkerhet enn vanlig 'enum' fordi verdiene ikke konverteres implisitt til int.",
        isCorrect: true,
        explanation: "Riktig. Scoped enum (enum class) krever eksplisitt cast for å konvertere til int og hindrer navnekonflikter, i motsetning til unscoped enum.",
      },
    ],
  },

  // raii-2 twin
  {
    id: "tw-raii2",
    variantGroupId: "raii-2",
    source: "Egenlaget",
    topic: "RAII",
    stem: "Se på klassedeklarasjonen under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `class Connection {
    int* socket;
public:
    Connection() {
        socket = new int{0};
    }
    void close() {
        delete socket;
    }
};

void run() {
    Connection conn;
    throw std::runtime_error("Tilkobling mistet");
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Klassen Connection overholder RAII fordi den har en close()-metode som frigjør minnet.",
        isCorrect: false,
        explanation: "Feil. RAII krever at ressursen frigjøres automatisk i destruktøren, ikke i en manuell metode som close(). Siden close() aldri kalles i run(), lekker minnet.",
      },
      {
        id: "b",
        text: "Koden forårsaker en minnelekkasje når run() kaster et unntak.",
        isCorrect: true,
        explanation: "Riktig. Connection har ingen destruktør, så socket frigjøres ikke under stack unwinding. Minnet lekker.",
      },
      {
        id: "c",
        text: "Connection har en implisitt standard destruktør generert av kompilatoren.",
        isCorrect: true,
        explanation: "Riktig. Siden ingen destruktør er deklarert, genererer kompilatoren en default destruktør. Den frigjør imidlertid ikke heap-allokert minne.",
      },
      {
        id: "d",
        text: "For at Connection skal overholde RAII, bør man legge til en destruktør (~Connection()) som kaller delete socket.",
        isCorrect: true,
        explanation: "Riktig. Med en destruktør som kaller delete socket vil RAII sikre at minnet frigjøres automatisk – også ved unntak.",
      },
    ],
  },

  // pekere-2 twin
  {
    id: "tw-pek2",
    variantGroupId: "pekere-2",
    source: "Egenlaget",
    topic: "Pekere",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `int x = 5;
const int* p = &x;
int* const q = &x;`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Man kan endre verdien som p peker til via *p = 10.",
        isCorrect: false,
        explanation: "Feil. p er en peker-til-const (const int*). Man kan ikke endre verdien gjennom p. Derimot kan man flytte p til en annen adresse.",
      },
      {
        id: "b",
        text: "Man kan endre hvilken adresse som er lagret i p.",
        isCorrect: true,
        explanation: "Riktig. p er av typen const int* – pekeren selv er ikke const. Man kan la p peke til noe annet, men ikke endre *p.",
      },
      {
        id: "c",
        text: "Man kan endre verdien som q peker til via *q = 10.",
        isCorrect: true,
        explanation: "Riktig. q er av typen int* const – en const-peker til int. Adressen er låst, men verdien det pekes til kan endres via *q.",
      },
      {
        id: "d",
        text: "Man kan endre hvilken adresse som er lagret i q.",
        isCorrect: false,
        explanation: "Feil. q er en const-peker (int* const). Adressen lagret i q er låst og kan ikke endres etter initialisering.",
      },
    ],
  },

  // kopiering-2 twin
  {
    id: "tw-kop2",
    variantGroupId: "kopiering-2",
    source: "Egenlaget",
    topic: "Kopiering",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `struct Point { int x; int y; };
Point a{3, 4};
Point b = a;
b.x = 10;`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Etter linje 4 er verdien til a.x lik 10.",
        isCorrect: false,
        explanation: "Feil. b = a lager en separat kopi av a. Endringer i b påvirker ikke a. a.x forblir 3.",
      },
      {
        id: "b",
        text: "Koden er et eksempel på dyp kopiering (deep copy).",
        isCorrect: true,
        explanation: "Riktig. Point inneholder ingen pekere. Kopiering av b = a lager to helt uavhengige objekter – dette er dyp kopiering.",
      },
      {
        id: "c",
        text: "a og b refererer til det samme objektet i minnet.",
        isCorrect: false,
        explanation: "Feil. b = a for en struct-type lager en separat kopi. a og b er to uavhengige objekter på stakken.",
      },
      {
        id: "d",
        text: "For struct-typer som ikke inneholder rå pekere skjer slik memberwise kopiering automatisk.",
        isCorrect: true,
        explanation: "Riktig. Kompilatoren genererer automatisk en kopikonstruktør og kopitilordning som kopierer hvert felt. For typer uten rå pekere gir dette alltid dyp kopiering.",
      },
    ],
  },

  // tilgang-2 twin
  {
    id: "tw-til2",
    variantGroupId: "tilgang-2",
    source: "Egenlaget",
    topic: "Tilgangsnivå og friend",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En barneklasse arver private-medlemmer fra baseklassen og kan aksessere dem direkte i sine egne metoder.",
        isCorrect: false,
        explanation: "Feil. private-medlemmer er tilgjengelige kun innenfor selve klassen de er deklarert i. Barneklasser arver dem, men kan ikke aksessere dem direkte.",
      },
      {
        id: "b",
        text: "friend-relasjoner arves ikke – om klasse B er friend av A, er ikke barneklassen til B automatisk friend av A.",
        isCorrect: true,
        explanation: "Riktig. Friend-relasjoner er eksplisitte og gjelder per klasse. De propagerer verken ned til barneklasser eller opp til baseklasser.",
      },
      {
        id: "c",
        text: "protected-tilgangsnivå brukes til å gi barneklasser tilgang til data som ikke skal være offentlig tilgjengelig.",
        isCorrect: true,
        explanation: "Riktig. protected gir tilgang til klassen selv og alle arvende klasser, men ikke til ekstern kode. Dette er nettopp hensikten.",
      },
      {
        id: "d",
        text: "En klasse kan erklære en annen hel klasse som sin friend, slik at alle klassens metoder får tilgang til private-membere.",
        isCorrect: true,
        explanation: "Riktig. friend class OtherClass; gir OtherClass full tilgang til alle private og protected medlemmer. Dette brukes i design patterns som f.eks. Builder.",
      },
    ],
  },

  // tilgang-3 twin
  {
    id: "tw-til3",
    variantGroupId: "tilgang-3",
    source: "Egenlaget",
    topic: "Tilgangsnivå og friend",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Med public arv (class B : public A) forblir A's public-metoder tilgjengelige som public i B.",
        isCorrect: true,
        explanation: "Riktig. Ved public arv beholder baseklassens public-metoder sin public synlighet i barneklassen og er tilgjengelige fra ekstern kode.",
      },
      {
        id: "b",
        text: "Med private arv (class B : private A) kan ikke B's egne metoder kalle A's public-metoder.",
        isCorrect: false,
        explanation: "Feil. Med private arv blir A's public-metoder private i B, men B's egne metoder kan fortsatt kalle dem internt. Det er ekstern kode som mister tilgang.",
      },
      {
        id: "c",
        text: "Med protected arv (class B : protected A) blir A's public-metoder tilgjengelige som protected i B.",
        isCorrect: true,
        explanation: "Riktig. Protected arv konverterer A's public-metoder til protected i B, noe som gjør dem tilgjengelige for B og B's barneklasser, men ikke for ekstern kode.",
      },
      {
        id: "d",
        text: "Uavhengig av arvetypen kan aldri A's private-metoder aksesseres direkte fra B's egne metoder.",
        isCorrect: true,
        explanation: "Riktig. private-tilgang er alltid begrenset til klassen de er deklarert i – uansett arvetype. Barneklassen kan bare nå dem via baseklassens public/protected grensesnitt.",
      },
    ],
  },

  // gui-1 twin
  {
    id: "tw-gui1",
    variantGroupId: "gui-1",
    source: "Egenlaget",
    topic: "GUI og AnimationWindow",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Et AnimationWindow-vindu kan inneholde mange widgets (f.eks. knapper) samtidig.",
        isCorrect: true,
        explanation: "Riktig. AnimationWindow støtter å legge til flere widgets i samme vindu.",
      },
      {
        id: "b",
        text: "Callback-funksjoner i AnimationWindow kan implementeres som lambda-funksjoner som fanger variabler fra omgivende skop.",
        isCorrect: true,
        explanation: "Riktig. En lambda er et funksjonsobjekt i C++ og tilfredsstiller signaturen void(). Lambda-capture lar den referere til variabler i det omgivende skopet.",
      },
      {
        id: "c",
        text: "Samme callback-funksjon kan ikke brukes som callback for mer enn én widget i samme vindu.",
        isCorrect: false,
        explanation: "Feil. Det er ingenting i C++ eller AnimationWindow som hindrer en funksjon fra å registreres som callback på flere widgets.",
      },
      {
        id: "d",
        text: "Callback-funksjoner som er registrert i AnimationWindow kalles automatisk av event-loopen når den tilhørende hendelsen inntreffer.",
        isCorrect: true,
        explanation: "Riktig. Event-loopen i AnimationWindow overvåker hendelser og kaller registrerte callbacks når riktig hendelse inntreffer.",
      },
    ],
  },

  // minne-1 twin
  {
    id: "tw-min1",
    variantGroupId: "minne-1",
    source: "Egenlaget",
    topic: "Minnehåndtering",
    stem: "Se på klassedeklarasjonen under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `class Matrix {
    double* data;
    int size;
public:
    Matrix(int n) : size{n} {
        data = new double[n * n];
    }
    ~Matrix() {
        delete data;
    }
};`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Destruktøren inneholder en feil – man bør bruke delete[] siden data ble allokert med new[].",
        isCorrect: true,
        explanation: "Riktig. new double[n*n] allokerer et array. Frigjøring av array-allokert minne krever delete[], ikke delete. Å bruke delete er udefinert atferd.",
      },
      {
        id: "b",
        text: "Klassen overholder RAII korrekt og minnet frigjøres alltid uten feil.",
        isCorrect: false,
        explanation: "Feil. Destruktøren bruker delete i stedet for delete[], noe som er udefinert atferd. RAII-prinsippet er riktig strukturert, men implementasjonen inneholder en bug.",
      },
      {
        id: "c",
        text: "Uten destruktøren ville alle instanser av Matrix forårsake en minnelekkasje.",
        isCorrect: true,
        explanation: "Riktig. Uten destruktør ville heap-minnet allokert med new double[n*n] aldri bli frigjort, og det ville lekke for hver instans.",
      },
      {
        id: "d",
        text: "Størrelsen på den allokerte minneblokken er n * n * sizeof(double) bytes.",
        isCorrect: true,
        explanation: "Riktig. new double[n*n] allokerer plass til n*n double-verdier, og hver double er sizeof(double) bytes (typisk 8 bytes).",
      },
    ],
  },

  // minne-2 twin
  {
    id: "tw-min2",
    variantGroupId: "minne-2",
    source: "Egenlaget",
    topic: "Minnehåndtering",
    stem: "Se på koden under.\n\nKoden er et eksempel på...",
    code: `int* getValue() {
    int x = 42;
    return &x;
}

int main() {
    int* p = getValue();
    std::cout << *p << std::endl;
    return 0;
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Minnelekkasje",
        isCorrect: false,
        explanation: "Feil. Koden allokerer ingenting på heap (ingen new). Minnelekkasje oppstår kun ved heap-allokering uten tilsvarende delete.",
      },
      {
        id: "b",
        text: "Dinglende peker (dangling pointer)",
        isCorrect: true,
        explanation: "Riktig. x er en lokal variabel i getValue() – den eksisterer bare på stakken mens funksjonen kjører. Etter retur er &x ugyldig, og p peker til frigjort stakk-minne.",
      },
      {
        id: "c",
        text: "Dobbel tom (double free)",
        isCorrect: false,
        explanation: "Feil. Ingen delete kalles i koden i det hele tatt, så det kan ikke oppstå double free.",
      },
      {
        id: "d",
        text: "Udefinert oppforsvar (undefined behavior) – verdien til *p er ikke kjent på forhånd",
        isCorrect: true,
        explanation: "Riktig. Å lese fra en dinglende peker er udefinert oppforsvar i C++. Verdien kan tilsynelatende fungere, krasje, eller gi vilkårlige resultater.",
      },
    ],
  },

  // smartpekere-1 twin
  {
    id: "tw-sp1",
    variantGroupId: "smartpekere-1",
    source: "Egenlaget",
    topic: "Smartpekere",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "std::unique_ptr kan kopieres til en annen std::unique_ptr uten at eierskapet endres.",
        isCorrect: false,
        explanation: "Feil. unique_ptr er ikke kopierbar – bare moveable. Kopiering ville gitt to eiere av samme objekt, noe unique_ptr eksplisitt forhindrer.",
      },
      {
        id: "b",
        text: "std::shared_ptr bruker referansetelling for å holde styr på antall eiere av det allokerte objektet.",
        isCorrect: true,
        explanation: "Riktig. shared_ptr øker referansetelleren ved kopiering og reduserer den ved destruksjon. Når telleren når 0, frigjøres det allokerte objektet.",
      },
      {
        id: "c",
        text: "Når den siste std::shared_ptr til et objekt destrueres, frigjøres det allokerte objektet automatisk.",
        isCorrect: true,
        explanation: "Riktig. Referansetelleren går til 0 og RAII-mekanismen sørger for automatisk frigjøring av heap-minnet.",
      },
      {
        id: "d",
        text: "std::make_unique<T>() er en tryggere og anbefalt måte å opprette et heap-objekt på enn å bruke new T() direkte.",
        isCorrect: true,
        explanation: "Riktig. make_unique er unntakssikkert og tydeliggjør eierskapet. Det er den anbefalte måten i moderne C++.",
      },
    ],
  },

  // abstrakte-1 twin
  {
    id: "tw-abs1",
    variantGroupId: "abstrakte-1",
    source: "Egenlaget",
    topic: "Abstrakte klasser",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En ren virtuell funksjon (pure virtual function) tvinger alle konkrete barneklasser til å gi en implementasjon.",
        isCorrect: true,
        explanation: "Riktig. En ren virtuell funksjon (= 0) gjør klassen abstrakt. Enhver barneklasse som ikke implementerer den, blir selv abstrakt.",
      },
      {
        id: "b",
        text: "En klasse med minst én ren virtuell funksjon kan ikke instansieres direkte.",
        isCorrect: true,
        explanation: "Riktig. Abstrakte klasser er per definisjon ikke instansierbare. Kompilatoren vil gi en feil om man prøver.",
      },
      {
        id: "c",
        text: "Virtuelle funksjoner er nødvendige for at dynamisk polymorfisme skal fungere korrekt via baseklasse-pekere eller -referanser.",
        isCorrect: true,
        explanation: "Riktig. Uten virtual bruker C++ statisk binding – kall via baseklasse-peker vil alltid kalle baseklassens versjon. virtual aktiverer vtable-oppslag og riktig dynamisk dispatch.",
      },
      {
        id: "d",
        text: "Å kalle en virtuell funksjon er alltid like raskt som å kalle en ikke-virtuell funksjon.",
        isCorrect: false,
        explanation: "Feil. Virtuelle funksjoner krever et vtable-oppslag ved kjøretid, noe som gir en liten ekstra kostnad sammenlignet med ikke-virtuelle funksjoner.",
      },
    ],
  },

  // arv-1 twin
  {
    id: "tw-arv1",
    variantGroupId: "arv-1",
    source: "Egenlaget",
    topic: "Arv og abstrakte klasser",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `class Animal {
public:
    virtual void speak() { std::cout << "..."; }
    void breathe() { std::cout << "hust"; }
};

class Dog : public Animal {
public:
    void speak() override { std::cout << "Voff"; }
};`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Et kall til speak() via en Animal*-peker som peker til et Dog-objekt vil kalle Dog::speak().",
        isCorrect: true,
        explanation: "Riktig. speak() er virtuell. Vtable-oppslaget ved kjøretid bestemmer at Dog::speak() skal kalles, selv om pekeren er av typen Animal*.",
      },
      {
        id: "b",
        text: "Et kall til breathe() via en Animal*-peker som peker til et Dog-objekt vil kalle Animal::breathe().",
        isCorrect: true,
        explanation: "Riktig. breathe() er ikke virtuell. Binding skjer statisk basert på peker-typen (Animal*), og Animal::breathe() kalles.",
      },
      {
        id: "c",
        text: "Dog-klassen overstyrer ikke speak() – den arver Animal::speak() uendret.",
        isCorrect: false,
        explanation: "Feil. Dog deklarerer void speak() override, noe som eksplisitt overstyrer Animal::speak(). override bekrefter at en virtuell funksjon fra baseklassen overstyres.",
      },
      {
        id: "d",
        text: "Man kan lagre et Dog-objekt i en Animal*-variabel uten eksplisitt typekonvertering.",
        isCorrect: true,
        explanation: "Riktig. Oppkast (upcasting) fra barneklasse til baseklasse er alltid implisitt og trygt i C++.",
      },
    ],
  },

  // dekl-def-2 twin
  {
    id: "tw-dd2",
    variantGroupId: "dekl-def-2",
    source: "Egenlaget",
    topic: "Deklarasjon og definisjon",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Inline-funksjoner er unntatt fra One Definition Rule (ODR) og kan trygt defineres i header-filer som inkluderes av mange .cpp-filer.",
        isCorrect: true,
        explanation: "Riktig. Inline-funksjoner har et spesielt unntak i ODR – kompilatoren tillater identiske definisjoner på tvers av kompileringsenheter.",
      },
      {
        id: "b",
        text: "Template-funksjoner følger ODR strengt og bør kun defineres i én .cpp-fil.",
        isCorrect: false,
        explanation: "Feil. Template-definisjoner MÅ ligge i header-filer (eller være synlige der de instansieres), fordi kompilatoren trenger hele definisjonen for å generere kode for hver type.",
      },
      {
        id: "c",
        text: "En global variabel kan deklareres i en header med 'extern' nøkkelordet for å unngå ODR-brudd ved inkludering i mange kildefiler.",
        isCorrect: true,
        explanation: "Riktig. extern int g; er bare en deklarasjon. Definisjonen (int g = 0;) plasseres én gang i en .cpp-fil, noe som overholder ODR.",
      },
      {
        id: "d",
        text: "En klasse definert i en header med #pragma once kan trygt inkluderes av mange .cpp-filer uten ODR-brudd.",
        isCorrect: true,
        explanation: "Riktig. ODR tillater identiske klassedefinsjoner på tvers av kompileringsenheter så lenge de er identiske. #pragma once sikrer at samme header ikke inkluderes to ganger i én kompileringsenhet.",
      },
    ],
  },

  // typekonv-1 twin
  {
    id: "tw-typ1",
    variantGroupId: "typekonv-1",
    source: "Egenlaget",
    topic: "Typekonvertering",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "static_cast<int>(3.9) gir resultatet 4 (avrunding til nærmeste heltall).",
        isCorrect: false,
        explanation: "Feil. static_cast<int> avkorter mot null, ikke avrunder. static_cast<int>(3.9) gir 3. For avrunding til nærmeste heltall bruker man std::round().",
      },
      {
        id: "b",
        text: "Implisitt konvertering fra 'double' til 'float' kan føre til tap av presisjon.",
        isCorrect: true,
        explanation: "Riktig. double har 52 mantissa-biter og float har 23. Konvertering fra double til float er en innsnevrende konvertering og kan miste presisjon.",
      },
      {
        id: "c",
        text: "static_cast er den tryggeste cast-operatoren for nedkonvertering (downcasting) i et arvehierarki.",
        isCorrect: false,
        explanation: "Feil. dynamic_cast er tryggere for downcasting fordi den sjekker typen ved kjøretid og returnerer nullptr (eller kaster std::bad_cast) om konverteringen feiler. static_cast for downcasting er udefinert atferd om typen er feil.",
      },
      {
        id: "d",
        text: "En implisitt konvertering fra 'int' til 'double' medfører normalt ikke tap av presisjon for typiske heltallsverdier.",
        isCorrect: true,
        explanation: "Riktig. double har nok mantissa-biter (52 bits) til å representere alle int-verdier (32 bits) nøyaktig.",
      },
    ],
  },

  // lokker-1 twin
  {
    id: "tw-lok1",
    variantGroupId: "lokker-1",
    source: "Egenlaget",
    topic: "Løkker",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En do-while-løkke kjører alltid kroppen minst én gang, uavhengig av betingelsen.",
        isCorrect: true,
        explanation: "Riktig. do-while evaluerer betingelsen ETTER at kroppen er kjørt første gang, noe som garanterer minst én kjøring.",
      },
      {
        id: "b",
        text: "break-setningen avslutter bare den innerste løkken den er plassert i, ikke eventuelle ytre løkker.",
        isCorrect: true,
        explanation: "Riktig. break hopper ut til koden rett etter den innerste løkkens avsluttende klammeparentes. For å bryte ytre løkker trenger man f.eks. flagg-variabler eller goto.",
      },
      {
        id: "c",
        text: "En range-basert for-løkke (for (auto x : container)) kan ikke brukes med vanlige C++-arrays.",
        isCorrect: false,
        explanation: "Feil. Range-basert for fungerer utmerket med vanlige C++-arrays: for (auto x : myArray) { ... } er gyldig.",
      },
      {
        id: "d",
        text: "En uendelig while(true)-løkke kan avsluttes med en break-setning inne i løkken.",
        isCorrect: true,
        explanation: "Riktig. break avslutter løkken umiddelbart og fortsetter kjøringen etter løkkens avsluttende klammeparentes.",
      },
    ],
  },

  // random-1 twin
  {
    id: "tw-rnd1",
    variantGroupId: "random-1",
    source: "Egenlaget",
    topic: "Tilfeldige tall",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `std::random_device device;
std::default_random_engine engine{device()};
std::uniform_int_distribution<int> dist(1, 6);
int roll = dist(engine);`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Tallene generert av dette programmet vil alltid være de samme ved gjentatte kjøringer.",
        isCorrect: false,
        explanation: "Feil. engine seedes med device() som gir ulik entropi ved hver kjøring. Sekvensen vil være forskjellig, i motsetning til dersom man bruker et fast tall som seed.",
      },
      {
        id: "b",
        text: "std::random_device gir typisk ekte tilfeldige tall basert på maskinvareentropi.",
        isCorrect: true,
        explanation: "Riktig. std::random_device er ment å gi ikke-deterministiske tall basert på maskinvarekilder. Den brukes typisk til å seed en PRNG, som her.",
      },
      {
        id: "c",
        text: "dist(engine) vil alltid returnere et heltall mellom 1 og 6 inklusivt.",
        isCorrect: true,
        explanation: "Riktig. std::uniform_int_distribution<int>(1, 6) genererer heltall i det lukkede intervallet [1, 6]. Begge grenseverdier kan returneres.",
      },
      {
        id: "d",
        text: "std::uniform_int_distribution<int> dist(1, 6) kan aldri generere verdien 6.",
        isCorrect: false,
        explanation: "Feil. Distribusjonen er inklusiv på begge grenser. Verdien 6 er like sannsynlig som alle andre verdier i [1, 6].",
      },
    ],
  },

  // direktivet-1 twin
  {
    id: "tw-dir1",
    variantGroupId: "direktivet-1",
    source: "Egenlaget",
    topic: "Kompilatordirektiver",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "#define navn verdi definerer en makro som preprosessoren erstatter tekstlig i all kildekode som følger.",
        isCorrect: true,
        explanation: "Riktig. #define er et preprosessordirektiv. Preprosessoren gjør en tekstlig substitusjon overalt der makronavnet forekommer etter definisjonen.",
      },
      {
        id: "b",
        text: "Makroer definert med #define kan ta parametere, akkurat som vanlige funksjoner.",
        isCorrect: true,
        explanation: "Riktig. Funksjonslignende makroer som #define SQUARE(x) ((x)*(x)) er gyldige. De er tekstlig substitusjon, ikke ekte funksjoner.",
      },
      {
        id: "c",
        text: "#if, #ifdef og #endif er kompilatordirektiver som evalueres under selve kompileringsfasen.",
        isCorrect: false,
        explanation: "Feil. #if, #ifdef og #endif er preprosessordirektiver. De evalueres av preprosessoren FØR kompileringen, og brukes til betinget kompilering.",
      },
      {
        id: "d",
        text: "Preprosessoren kjøres som et eget steg FØR selve kompileringen.",
        isCorrect: true,
        explanation: "Riktig. Preprosessering er det første steget i kompileringspipelinen – den behandler direktiver og produserer ren kildekode som kompilatoren deretter kompilerer.",
      },
    ],
  },

  // constexpr-1 twin
  {
    id: "tw-cx1",
    variantGroupId: "constexpr-1",
    source: "Egenlaget",
    topic: "constexpr og funksjoner",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En constexpr-variabel har alltid en verdi som er kjent ved kompileringstid.",
        isCorrect: true,
        explanation: "Riktig. constexpr på en variabel krever at initialiseringsverdien er et konstant uttrykk. Verdien er dermed alltid tilgjengelig ved kompileringstid.",
      },
      {
        id: "b",
        text: "En const-variabel kan ha en verdi som først er kjent ved kjøretid.",
        isCorrect: true,
        explanation: "Riktig. const betyr at variabelen ikke kan endres etter initialisering, men initialiseringsverdien kan komme fra kjøretid. F.eks.: const int x = getUserInput(); er gyldig.",
      },
      {
        id: "c",
        text: "En constexpr-funksjon kan aldri kalles med argumenter som kun er kjent ved kjøretid.",
        isCorrect: false,
        explanation: "Feil. En constexpr-funksjon KAN kalles med kjøretidsargumenter. I så fall evalueres den ved kjøretid som en vanlig funksjon. constexpr-funksjoner kan brukes i begge kontekster.",
      },
      {
        id: "d",
        text: "constexpr-variabler er implisitt const.",
        isCorrect: true,
        explanation: "Riktig. En constexpr-variabel er automatisk const – man kan ikke endre verdien etter initialisering.",
      },
    ],
  },

  // vardekl-1 twin
  {
    id: "tw-vd1",
    variantGroupId: "vardekl-1",
    source: "Egenlaget",
    topic: "Variabeldeklarasjoner",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "'auto' nøkkelordet kan brukes i stedet for eksplisitt datatype, men krever alltid en initialiseringsverdi for typedeeksjon.",
        isCorrect: true,
        explanation: "Riktig. auto ber kompilatoren utlede typen fra initialiseringsuttrykket. Uten initialiseringsverdi har ikke kompilatoren nok informasjon og gir en kompileringsfeil.",
      },
      {
        id: "b",
        text: "Unifisert initialisering (int x{5}) og kopi-initialisering (int x = 5) er fullstendig ekvivalente for alle typer og alle verdier.",
        isCorrect: false,
        explanation: "Feil. Unifisert initialisering tillater ikke innsnevrende konverteringer. int x{3.9}; er en kompileringsfeil, mens int x = 3.9; er gyldig (men avkorter til 3). De er ikke ekvivalente.",
      },
      {
        id: "c",
        text: "'int x = 3.9;' er gyldig C++ og verdien til x blir 3 (avkortning mot null).",
        isCorrect: true,
        explanation: "Riktig. C++ tillater implisitt innsnevrende konvertering fra double til int ved kopi-initialisering. Desimaldelen avkortes mot null, så x = 3.",
      },
      {
        id: "d",
        text: "En lokal variabel deklarert uten initialisering (f.eks. int x;) får alltid verdien 0.",
        isCorrect: false,
        explanation: "Feil. Lokale variabler uten initialisering har en udefinert (indeterminate) verdi. Bare globale og statiske variabler er garantert null-initialisert.",
      },
    ],
  },

  // egentyper-1 twin
  {
    id: "tw-et1",
    variantGroupId: "egentyper-1",
    source: "Egenlaget",
    topic: "Egendefinerte typer",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Verdier i en vanlig 'enum' konverteres implisitt til int i C++.",
        isCorrect: true,
        explanation: "Riktig. Unscoped enum-verdier konverteres implisitt til int. Dette kan gi uventet atferd og er en av grunnene til at enum class ble introdusert.",
      },
      {
        id: "b",
        text: "'enum class'-verdier kan brukes direkte i aritmetiske uttrykk uten eksplisitt konvertering.",
        isCorrect: false,
        explanation: "Feil. enum class-verdier konverteres ikke implisitt til int. Man må bruke static_cast<int>(verdi) for å bruke dem i aritmetikk.",
      },
      {
        id: "c",
        text: "En 'enum class' krever at man bruker klassenavnet som prefiks ved bruk av verdiene (f.eks. Color::Red).",
        isCorrect: true,
        explanation: "Riktig. Scoped enum krever kvalifisert navn (Color::Red). Dette unngår navnekonflikter og gjør koden mer lesbar.",
      },
      {
        id: "d",
        text: "Både 'enum' og 'enum class' kan ha en eksplisitt underliggende type (f.eks. enum class Status : uint8_t).",
        isCorrect: true,
        explanation: "Riktig. Man kan spesifisere den underliggende heltallstypen for begge variantene, noe som er nyttig for minneeffektivitet og interoperabilitet.",
      },
    ],
  },

  // uinit-verdier-1 twin
  {
    id: "tw-uv1",
    variantGroupId: "uinit-verdier-1",
    source: "Egenlaget",
    topic: "Verdier og initialisering",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `int global_counter = 0;

struct Point {
    int x = 0;
    int y;
    double z{};
};

int main() {
    Point p;
    std::cout << p.x << std::endl;  // linje 11
    std::cout << p.y << std::endl;  // linje 12
    std::cout << p.z << std::endl;  // linje 13
    std::cout << global_counter << std::endl; // linje 14
}`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Verdien til p.x som skrives ut på linje 11 er alltid 0.",
        isCorrect: true,
        explanation: "Riktig. x har en default member initializer (= 0). Denne brukes ved default-initialisering av Point p;, så p.x er alltid 0.",
      },
      {
        id: "b",
        text: "Verdien til p.y som skrives ut på linje 12 er alltid 0.",
        isCorrect: false,
        explanation: "Feil. y mangler initialisering. Point p; er default-initialisering, og for struct med brukerdefinert initialisering betyr dette at y forblir uinitialisert (indeterminate value).",
      },
      {
        id: "c",
        text: "Verdien til p.z som skrives ut på linje 13 er alltid 0.0.",
        isCorrect: true,
        explanation: "Riktig. z{} er verdi-initialisering som setter z til 0.0 for en double.",
      },
      {
        id: "d",
        text: "Verdien til global_counter som skrives ut på linje 14 er alltid 0.",
        isCorrect: true,
        explanation: "Riktig. Globale variabler er alltid null-initialisert ved programstart. global_counter er eksplisitt initialisert til 0, men ville vært 0 uansett.",
      },
    ],
  },

  // ─── KLASSEMEDLEMMER ──────────────────────────────────────────────────────

  {
    id: "v24v2-q6",
    variantGroupId: "klassemedl-1",
    source: "V24V2",
    topic: "Klassemedlemmer",
    stem: "Hvilke (en eller flere) av disse kan være medlemmer i en klasse?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Variabler",
        isCorrect: true,
        explanation:
          "Riktig. Medlemsvariabler er en grunnleggende del av en klasse og lagrer tilstanden til objektet.",
      },
      {
        id: "b",
        text: "Variabler merket som constexpr",
        isCorrect: true,
        explanation:
          "Riktig. Statiske constexpr-variabler er gyldige klassemedlemmer.",
      },
      {
        id: "c",
        text: "Statiske funksjoner",
        isCorrect: true,
        explanation:
          "Riktig. Statiske medlemsfunksjoner tilhører klassen (ikke instansen) og er gyldige klassemedlemmer.",
      },
      {
        id: "d",
        text: "Funksjoner",
        isCorrect: true,
        explanation:
          "Riktig. Medlemsfunksjoner (metoder) er en grunnleggende del av en klasse.",
      },
    ],
  },

  {
    id: "tw-km1",
    variantGroupId: "klassemedl-1",
    source: "custom",
    topic: "Klassemedlemmer",
    stem: "Hvilke (en eller flere) av følgende utsagn om statiske klassemedlemmer er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En statisk medlemsvariabel (static) deles av alle instanser av klassen.",
        isCorrect: true,
        explanation:
          "Riktig. Det finnes bare én kopi av en statisk medlemsvariabel, felles for alle instanser.",
      },
      {
        id: "b",
        text: "En statisk medlemsfunksjon kan aksessere ikke-statiske medlemsvariabler direkte.",
        isCorrect: false,
        explanation:
          "Feil. En statisk medlemsfunksjon har ingen this-peker og kan derfor ikke aksessere ikke-statiske medlemsvariabler direkte.",
      },
      {
        id: "c",
        text: "En statisk medlemsvariabel kan (og bør) initialiseres utenfor klassekroppen i en .cpp-fil.",
        isCorrect: true,
        explanation:
          "Riktig. Statiske medlemsvariabler må vanligvis defineres og initialiseres utenfor klassekroppen – typisk i en .cpp-fil.",
      },
      {
        id: "d",
        text: "En statisk const int-variabel kan initialiseres direkte inne i klassekroppen.",
        isCorrect: true,
        explanation:
          "Riktig. Integralkonstanter merket static const (eller static constexpr) kan initialiseres inline i klassekroppen.",
      },
    ],
  },

  // ─── K24 (SOMMER 2024) – DEL 1 ───────────────────────────────────────────

  {
    id: "k24-q1",
    variantGroupId: "k24-q1",
    source: "K24",
    examSet: "K24",
    topic: "Konstanter",
    stem: "På hvilke måter (en eller flere) kan man deklarere en konstant i C++?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Skrive variabelnavnet med blokk-bokstaver.",
        isCorrect: false,
        explanation: "Feil. Store bokstaver i variabelnavn er kun en navnekonvensjon og gjør ikke variabelen til en konstant.",
      },
      {
        id: "b",
        text: "Bruke nøkkelordet const.",
        isCorrect: true,
        explanation: "Riktig. const gjør en variabel uforanderlig etter initialisering – dette er den vanligste måten å deklarere en konstant på.",
      },
      {
        id: "c",
        text: "Bruke nøkkelordet constexpr.",
        isCorrect: true,
        explanation: "Riktig. constexpr erklærer en konstant som er evaluerbar på kompileringstid, og er en gyldig måte å deklarere konstanter på.",
      },
      {
        id: "d",
        text: "Bruke nøkkelordet constant.",
        isCorrect: false,
        explanation: "Feil. 'constant' er ikke et gyldig nøkkelord i C++.",
      },
    ],
  },

  {
    id: "k24-q2",
    variantGroupId: "k24-q2",
    source: "K24",
    examSet: "K24",
    topic: "Funksjoner",
    stem: "I hvilke (en eller flere) av situasjonene under burde man bruke pass-by-reference?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Når man gir en heltallsvariabel til en funksjon som regner ut kvadratroten og returnerer resultatet.",
        isCorrect: false,
        explanation: "Feil. En enkel heltallsvariabel er liten og billig å kopiere – pass-by-value er tilstrekkelig her.",
      },
      {
        id: "b",
        text: "Når man gir et stort array av strenger til en funksjon som gjør alle forbokstaver store.",
        isCorrect: true,
        explanation: "Riktig. Et stort array er kostbart å kopiere, og funksjonen må endre innholdet – pass-by-reference er riktig valg.",
      },
      {
        id: "c",
        text: "Når man gir en stor vektor av flyttall til en funksjon som regner ut gjennomsnittet av alle tallene i vektoren og returnerer gjennomsnittet.",
        isCorrect: true,
        explanation: "Riktig. En stor vektor er kostbar å kopiere – pass-by-const-reference gir ytelse uten å tillate endringer.",
      },
      {
        id: "d",
        text: "Når man har en funksjon som tar inn en unique_ptr, men hvor funksjonen ikke endrer på verdien den peker til.",
        isCorrect: true,
        explanation: "Riktig. unique_ptr kan ikke kopieres, så man må bruke pass-by-reference (helst const-reference siden funksjonen ikke endrer verdien).",
      },
    ],
  },

  {
    id: "k24-q3",
    variantGroupId: "k24-q3",
    source: "K24",
    examSet: "K24",
    topic: "Klasser og kopiering",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "En kopi-konstruktør kan brukes til å lage et nytt klasseobjekt ved å kopiere verdier fra et annet klasseobjekt av samme klasse.",
        isCorrect: true,
        explanation: "Riktig. Dette er standard bruk av kopi-konstruktøren – den tar en const-referanse til et objekt av samme klasse.",
      },
      {
        id: "b",
        text: "Enhver klasse har en kopi-konstruktør.",
        isCorrect: false,
        explanation: "Feil. Kompilatoren genererer en standard kopi-konstruktør automatisk, men den kan slettes med =delete, og klassen kan da ikke kopieres.",
      },
      {
        id: "c",
        text: "En kopi-konstruktør kan defineres slik at den initialiserer et nytt klasseobjekt ved å kopiere verdier fra et annet klasseobjekt av en hvilken som helst klasse.",
        isCorrect: true,
        explanation: "Riktig. En kopi-konstruktør kan ta en referanse til et objekt av en annen type – dette fungerer som en konverteringskonstruktør.",
      },
      {
        id: "d",
        text: "En kopi-konstruktør kan kun brukes til grunn kopiering (shallow copy).",
        isCorrect: false,
        explanation: "Feil. En kopi-konstruktør kan implementeres for å gjøre dyp kopiering (deep copy) – f.eks. kopiere dynamisk allokerte ressurser.",
      },
    ],
  },

  {
    id: "k24-q4",
    variantGroupId: "k24-q4",
    source: "K24",
    examSet: "K24",
    topic: "Egendefinerte typer",
    stem: "Se på koden under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `enum class Color {
    red = 2, blue, yellow
};

Color c = Color::yellow;`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Det er ikke mulig å definere en ny enum-klasse med verdiene red, blue, og yellow, fordi de allerede finnes i Color.",
        isCorrect: false,
        explanation: "Feil. enum class har sitt eget skop – red, blue og yellow i Color kolliderer ikke med enumeratorer i en annen enum class.",
      },
      {
        id: "b",
        text: "Verdiene til enumeratorene red, blue og yellow lagres som strenger.",
        isCorrect: false,
        explanation: "Feil. Enumeratorverdiene lagres som heltall (int), ikke strenger. red=2, blue=3, yellow=4.",
      },
      {
        id: "c",
        text: "Det er ikke mulig å direkte sammenligne en variabel av typen Color med en int.",
        isCorrect: true,
        explanation: "Riktig. enum class gir sterk typing – direkte sammenligning med int er ikke tillatt uten eksplisitt cast.",
      },
      {
        id: "d",
        text: "Det er ikke mulig å tilordne verdien Color::yellow til en variabel fordi det er siste verdien som er definert i enum class.",
        isCorrect: false,
        explanation: "Feil. Man kan tilordne hvilken som helst gyldig enumeratorverdi til en variabel av riktig enum class-type, inkludert den siste.",
      },
    ],
  },

  {
    id: "k24-q5",
    variantGroupId: "k24-q5",
    source: "K24",
    examSet: "K24",
    topic: "Arv og tilgangsnivå",
    stem: "Se på koden under.\n\nHvor mange medlemsfunksjoner har klassen A? Du trenger ikke telle med funksjoner som er standard-definert.",
    code: `class B {
        int y = 5;
protected:
        void f() const {}
        void g() {}
public:
        std::string s = "hello";

        virtual void c() = 0;
        void d() {}
};

class A : public B {
        int x;
public:
        void a() {}
        void b() {}
};`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "5",
        isCorrect: true,
        explanation: "Riktig. A arver f(), g() og d() fra B (3 implementerte funksjoner) og definerer selv a() og b() (2 funksjoner). Den rene virtuelle c() er ikke implementert i A, så totalt 5.",
      },
      {
        id: "b",
        text: "2",
        isCorrect: false,
        explanation: "Feil. A har sine egne a() og b(), men arver også f(), g() og d() fra B.",
      },
      {
        id: "c",
        text: "4",
        isCorrect: false,
        explanation: "Feil. A arver 3 implementerte funksjoner fra B (f, g, d) pluss definerer 2 egne (a, b) = 5 totalt.",
      },
      {
        id: "d",
        text: "6",
        isCorrect: false,
        explanation: "Feil. Den rene virtuelle c() er ikke implementert i A og teller ikke som en implementert funksjon.",
      },
    ],
  },

  {
    id: "k24-q6",
    variantGroupId: "k24-q6",
    source: "K24",
    examSet: "K24",
    topic: "RAII og smartpekere",
    stem: "Se på klassedeklarasjonen under.\n\nHvilke (en eller flere) av følgende utsagn er korrekte?",
    code: `class A {
    std::unique_ptr<std::ofstream> fileStream;

public:
    A(const string &filename) : fileStream{new std::ofstream(filename)} {

    }
};`,
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Klassen overholder RAII (Resource Acquisition Is Initialization).",
        isCorrect: true,
        explanation: "Riktig. Filen åpnes i konstruktøren og lukkes automatisk når unique_ptr går ut av skop (destruktøren kalles). Dette er RAII.",
      },
      {
        id: "b",
        text: "Klassen har en implisitt standard (default) destruktør.",
        isCorrect: true,
        explanation: "Riktig. Siden ingen destruktør er definert eksplisitt, genererer kompilatoren en standard destruktør. unique_ptr sørger selv for opprydding.",
      },
      {
        id: "c",
        text: "Klassen mangler en destruktør som lukker filstrømmen fileStream for at den skal overholde RAII.",
        isCorrect: false,
        explanation: "Feil. unique_ptr håndterer automatisk frigjøring av ressursen – en eksplisitt destruktør er ikke nødvendig for RAII her.",
      },
      {
        id: "d",
        text: "Når en instans av klassen A går ut av skop, oppstår det en minnelekkasje.",
        isCorrect: false,
        explanation: "Feil. unique_ptr frigjør ressursen automatisk når objektet går ut av skop – ingen minnelekkasje.",
      },
    ],
  },

  {
    id: "k24-q7",
    variantGroupId: "k24-q7",
    source: "K24",
    examSet: "K24",
    topic: "Beholdere",
    stem: "Hvilke (en eller flere) av de følgende beholderene har ikke elementene liggende rett etter hverandre i minnet?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "std::map",
        isCorrect: true,
        explanation: "Riktig. std::map er implementert som et rød-svart tre – elementene ligger spredt i minnet, ikke sammenhengende.",
      },
      {
        id: "b",
        text: "std::vector",
        isCorrect: false,
        explanation: "Feil. std::vector lagrer elementer sammenhengende i minnet, noe som gir effektiv tilgang og cache-vennlighet.",
      },
      {
        id: "c",
        text: "std::set",
        isCorrect: true,
        explanation: "Riktig. std::set er også implementert som et rød-svart tre – elementene er ikke lagret sammenhengende i minnet.",
      },
      {
        id: "d",
        text: "std::array",
        isCorrect: false,
        explanation: "Feil. std::array er en tynn innpakning rundt et C-array – elementene ligger alltid sammenhengende i minnet.",
      },
    ],
  },

  {
    id: "k24-q8",
    variantGroupId: "k24-q8",
    source: "K24",
    examSet: "K24",
    topic: "Minnehåndtering",
    stem: "Hvilke av følgende utsagn om minnelagring av programelementer i C++ er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Et objekt allokert med new-operatoren lagres på heap (free store).",
        isCorrect: true,
        explanation: "Riktig. new allokerer minne på heap (free store) og returnerer en peker til det allokerte objektet.",
      },
      {
        id: "b",
        text: "Lokale variabler lagres på stack.",
        isCorrect: true,
        explanation: "Riktig. Lokale variabler i en funksjon legges på kallstakken og frigjøres automatisk når funksjonen returnerer.",
      },
      {
        id: "c",
        text: "Funksjonsargumenter lagres på heap.",
        isCorrect: false,
        explanation: "Feil. Funksjonsargumenter lagres på stack (som en del av funksjonens stack-ramme), ikke på heap.",
      },
      {
        id: "d",
        text: "Medlemsvariabler lagres alltid på stack.",
        isCorrect: false,
        explanation: "Feil. Medlemsvariabler lagres der objektet de tilhører er allokert – på stack hvis objektet er lokalt, på heap hvis objektet er allokert med new.",
      },
    ],
  },

  {
    id: "k24-q9",
    variantGroupId: "k24-q9",
    source: "K24",
    examSet: "K24",
    topic: "Dynamisk minne",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "new-operatoren returnerer en peker til et objekt i minnet av en bestemt type.",
        isCorrect: true,
        explanation: "Riktig. new allokerer minne på heap og returnerer en typet peker til det nyopprettede objektet.",
      },
      {
        id: "b",
        text: "new-operatoren allokerer alltid på stack-lageret (stack storage).",
        isCorrect: false,
        explanation: "Feil. new allokerer på heap (free store), ikke på stack. Stack-allokering skjer automatisk for lokale variabler.",
      },
      {
        id: "c",
        text: "Man må bestemme hvor mange objekter av en type som skal allokeres før kjøretid når man bruker new-operatoren.",
        isCorrect: false,
        explanation: "Feil. En av fordelene med new er at man kan bestemme antall objekter dynamisk under kjøretid.",
      },
      {
        id: "d",
        text: "Uttrykket int* a = new int{5}; vil allokere et array av 5 int på heap.",
        isCorrect: false,
        explanation: "Feil. new int{5} allokerer én int med verdien 5. For å allokere et array av 5 int brukes new int[5].",
      },
    ],
  },

  {
    id: "k24-q10",
    variantGroupId: "k24-q10",
    source: "K24",
    examSet: "K24",
    topic: "Templates",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Kompilatoren kan i noen tilfeller løse template-parametre uten at typen til parametrene er oppgitt.",
        isCorrect: true,
        explanation: "Riktig. Template argument deduction (CTAD) lar kompilatoren utlede template-typer fra argumentene som sendes inn.",
      },
      {
        id: "b",
        text: "Klassetemplates kan ikke ha standard (default) template-parametre.",
        isCorrect: false,
        explanation: "Feil. Klassetemplates kan ha standard template-parametre, f.eks. template<typename T = int>.",
      },
      {
        id: "c",
        text: "Template-argumenter kan kun være klasser.",
        isCorrect: false,
        explanation: "Feil. Template-argumenter kan være typer (klasser, innebygde typer), ikke-type parametre (f.eks. int), og andre templates.",
      },
      {
        id: "d",
        text: "Templates må plasseres i en header-fil.",
        isCorrect: false,
        explanation: "Feil. Templates trenger ikke å ligge i header-filer, men implementasjonen må være synlig for kompilatoren der den instantieres.",
      },
    ],
  },

  {
    id: "k24-q11",
    variantGroupId: "k24-q11",
    source: "K24",
    examSet: "K24",
    topic: "I/O og filer",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Operativsystemet vil opprette en fil man prøver å skrive til hvis den ikke eksisterer.",
        isCorrect: true,
        explanation: "Riktig. Når man åpner en fil for skriving (f.eks. std::ofstream), oppretter operativsystemet filen automatisk hvis den ikke finnes.",
      },
      {
        id: "b",
        text: "En fil er en sekvens med bytes.",
        isCorrect: true,
        explanation: "Riktig. Filer lagres som sekvenser av bytes på lagringsmediet, uavhengig av hva de inneholder.",
      },
      {
        id: "c",
        text: "Operativsystemet vil opprette en fil man prøver å lese fra hvis den ikke eksisterer.",
        isCorrect: false,
        explanation: "Feil. Forsøk på å lese fra en ikke-eksisterende fil feiler – operativsystemet oppretter ikke filen automatisk ved lesing.",
      },
      {
        id: "d",
        text: "Det er ikke mulig å skrive private klassemedlemmer til fil.",
        isCorrect: false,
        explanation: "Feil. Man kan skrive private medlemmer til fil ved å bruke friend-funksjoner, getter-metoder eller operator<<-overlasting.",
      },
    ],
  },

  {
    id: "k24-q12",
    variantGroupId: "k24-q12",
    source: "K24",
    examSet: "K24",
    topic: "Unntakshåndtering",
    stem: "Hvilke (en eller flere) av følgende utsagn er korrekte?",
    maxPoints: 5,
    options: [
      {
        id: "a",
        text: "Minne som har blitt allokert med new-operatoren i funksjonen blir automatisk frigjort når et unntak blir kastet.",
        isCorrect: false,
        explanation: "Feil. Rå pekere allokert med new frigjøres IKKE automatisk ved unntak – dette er nettopp hvorfor man bør bruke RAII/smartpekere.",
      },
      {
        id: "b",
        text: "Flere catch-blokker kan behandle samme type unntak.",
        isCorrect: true,
        explanation: "Riktig. Man kan ha flere catch-blokker for å håndtere ulike unntakstyper, og samme unntakstype kan fanges av ulike catch-blokker i ulike try/catch-blokker.",
      },
      {
        id: "c",
        text: "Dersom det ikke finnes en catch-blokk for et utløst unntak, vil unntaket ignoreres og programmet fortsette normal kjøring fra punktet der unntaket ble utløst.",
        isCorrect: false,
        explanation: "Feil. Dersom et unntak ikke håndteres av noen catch-blokk, kaller C++ std::terminate() og programmet avsluttes.",
      },
      {
        id: "d",
        text: "Programmet avslutter dersom et unntak ikke blir håndtert.",
        isCorrect: true,
        explanation: "Riktig. Et uhåndtert unntak fører til kall på std::terminate(), som normalt avslutter programmet.",
      },
    ],
  },

  // ─── K24 (SOMMER 2024) – DEL 2 ───────────────────────────────────────────

  {
    id: "k24-d2-q13",
    variantGroupId: "k24-d2-q13",
    source: "del2",
    examSet: "K24",
    topic: "Bibliotek og linking",
    maxPoints: 5,
    stem: "Forklar kort hva et bibliotek er og hvorfor linking er nyttig når man bruker bibliotek.",
    modelAnswer: `Et bibliotek er kode man har tilgang til gjennom deklarasjoner i en inkludert fil. Linkeren kombinerer delene av programmet man skriver selv og bibliotekene man bruker til en enkelt kjørefil (executable).`,
    options: [],
  },

  {
    id: "k24-d2-q14",
    variantGroupId: "k24-d2-q14",
    source: "del2",
    examSet: "K24",
    topic: "Funksjoner",
    maxPoints: 5,
    stem: "Forklar kort forskjellen på en funksjonsdeklarasjon og en funksjonsdefinisjon.",
    modelAnswer: `Funksjonsdeklarasjon: Spesifiserer navnet, parametrene og typen til returverdien til funksjonen. Forteller kompilatoren at funksjonen eksisterer slik at den kan kalles andre steder i programmet.

Funksjonsdefinisjon: Inkluderer en funksjonsdeklarasjon, men også implementasjonen til funksjonen.`,
    options: [],
  },

  {
    id: "k24-d2-q15",
    variantGroupId: "k24-d2-q15",
    source: "del2",
    examSet: "K24",
    topic: "Typekonvertering",
    maxPoints: 5,
    stem: "Forklar kort forskjellen på implisitt og eksplisitt typekonvertering.",
    modelAnswer: `Implisitt typekonvertering gjøres av kompilatoren og fungerer dersom typen man konverterer til bruker flere bits enn typen man konverterer fra.

Eksplisitt typekonvertering gjøres av programmereren og vil fungere selv hvis typekonverteringen fører til tap av presisjon. For å gjøre eksplisitt typekonvertering kan man bruke f.eks. static_cast.`,
    options: [],
  },

  {
    id: "k24-d2-q16",
    variantGroupId: "k24-d2-q16",
    source: "del2",
    examSet: "K24",
    topic: "Kopiering",
    maxPoints: 5,
    stem: "Forklar kort forskjellen på grunn kopiering (shallow copy) og dyp kopiering (deep copy).",
    modelAnswer: `Grunn kopiering: Kopierer kun pekeren slik at originalen og kopien refererer til samme objekt.

Dyp kopiering: Kopierer det en peker peker til slik at originalen og kopien peker til distinkte objekt.`,
    options: [],
  },

  {
    id: "k24-d2-q17",
    variantGroupId: "k24-d2-q17",
    source: "del2",
    examSet: "K24",
    topic: "Beholdere",
    maxPoints: 5,
    stem: "Hvorfor er det unødvendig å bruke std::unique_copy() for å kopiere elementene i en std::vector til et std::set?",
    modelAnswer: `En std::vector kan inneholde duplikate verdier, men duplikate verdier ignoreres når de plasseres i et std::set. std::unique_copy() kopierer kun unike verdier, så det vil være overflødig siden std::set allerede sørger for dette.`,
    options: [],
  },

  {
    id: "k24-d2-q18",
    variantGroupId: "k24-d2-q18",
    source: "del2",
    examSet: "K24",
    topic: "Beholdere",
    maxPoints: 5,
    stem: "Forklar kort hva som skjer når man kaller push_back() på en std::vector.",
    modelAnswer: `Når man kaller push_back() settes et nytt element på slutten av vektoren. Først sjekkes minnekapasiteten: hvis det er ledig kapasitet plasseres elementet direkte og size øker med én. Hvis kapasiteten er full allokeres et nytt, større minneområde (typisk dobbelt kapasitet), alle eksisterende elementer kopieres/flyttes dit, det nye elementet legges til, og det gamle minnet frigjøres. Capacity oppdateres tilsvarende.`,
    options: [],
  },

  {
    id: "k24-d2-q19",
    variantGroupId: "k24-d2-q19",
    source: "del2",
    examSet: "K24",
    topic: "Pekere",
    maxPoints: 5,
    stem: "Se på de to kodesnuttene under.\n\nKodesnutt 1 vil føre til en kjøretidsfeil, men det vil ikke kodesnutt 2. Forklar kort hvorfor.",
    code: `// Kodesnutt 1:
int* p = new int{10};
delete p;
delete p;       // dobbel frigjøring – kjøretidsfeil

// Kodesnutt 2:
int* p = new int{10};
p = new int{10};  // minnelekkasje, men ingen kjøretidsfeil
delete p;`,
    modelAnswer: `Kodesnutt 1 er et eksempel på dobbel frigjøring (double free): i linje 3 prøver vi å frigjøre minne som allerede er frigjort i linje 2. Dette gir udefinert atferd og typisk kjøretidsfeil.

Kodesnutt 2 gir en minnelekkasje siden det allokeres nytt minne til p i linje 2 uten at minnet fra linje 1 er frigjort først. Men det er ingen dobbel frigjøring – delete p frigjør kun det siste allokerte objektet.`,
    options: [],
  },

  {
    id: "k24-d2-q20",
    variantGroupId: "k24-d2-q20",
    source: "del2",
    examSet: "K24",
    topic: "Klasser",
    maxPoints: 5,
    stem: "Forklar kort hvilke problemer det er i kodesnutten under.",
    code: `class Counter {
public:
    void count(const int b) const {
        a += b;
        std::cout << "The counter is now set to: " << a << std::endl;
    }

private:
    int a = 0;
};

int main(void) {
    int b = 1;
    Counter a;
    a.count(b);
    return EXIT_SUCCESS;
}`,
    modelAnswer: `Problemet er at medlemsfunksjonen count() er deklarert som const (konstant funksjon), men prøver å endre medlemsvariabelen a med a += b. En const-funksjon kan ikke endre tilstanden til objektet den kalles på. Løsningen er å fjerne const fra funksjonsdeklarasjonen.`,
    options: [],
  },

  {
    id: "k24-d2-q21",
    variantGroupId: "k24-d2-q21",
    source: "del2",
    examSet: "K24",
    topic: "Smartpekere",
    maxPoints: 10,
    stem: "Se på koden under.\n\n(a) Hvorfor kompilerer ikke koden? Forklar kort.\n\n(b) Hva ville du gjort for å løse problemet?",
    code: `#include <vector>

using namespace std;

class A {
private:
    int x;
public:
    A(int x_) : x(x_) {}
};

int main(void) {
    unique_ptr<A> a {new A(5)};
    vector<unique_ptr<A>> vec;
    vec.push_back(a);

    return 0;
}`,
    modelAnswer: `(a) Koden kompilerer ikke fordi vec.push_back(a) prøver å kopiere den unike pekeren a. unique_ptr kan ikke kopieres – det er kun én eier tillatt.

(b) Mulige løsninger:
• Bruk vec.push_back(std::move(a)) for å flytte (move) eierskap til vektoren.
• Bruk vec.push_back(make_unique<A>(5)) for å opprette pekeren direkte i vektoren.
• Bytt unique_ptr med shared_ptr, som tillater kopiering.`,
    options: [],
  },

  {
    id: "k24-d2-q22",
    variantGroupId: "k24-d2-q22",
    source: "del2",
    examSet: "K24",
    topic: "Templates og operatorer",
    maxPoints: 10,
    stem: "Se på koden under.\n\n(a) Hvorfor kompilerer ikke koden? Forklar kort.\n\n(b) Hva må gjøres for å løse problemet gitt at du ikke kan endre noe i main?",
    code: `#include <iostream>

template<typename T>
struct Point {
    T x = 0;
    T y = 0;
};

int main(void) {
    Point<int> p1{2,4};
    Point<int> p2{1,6};

    if (p1 > p2) {
        std::cout << "The first point is largest" << std::endl;
    } else if (p1 == p2) {
        std::cout << "The points are equal" << std::endl;
    } else {
        std::cout << "The second point is largest" << std::endl;
    }

    return 0;
}`,
    modelAnswer: `(a) Koden kompilerer ikke fordi operatorene >, == og < ikke er definert for Point<T>. Kompilatoren vet ikke hvordan den skal sammenligne to Point-objekter.

(b) Man må overlaste (overloade) operatorene >, == og < for Point<T>. For eksempel kan == sammenlignes ved å sjekke om x og y er like, og < kan defineres basert på en valgfri ordning (f.eks. sammenligne x først, deretter y).`,
    options: [],
  },

  // ─── DEL 2 ────────────────────────────────────────────────────────────────
  // Eksamensoppgaver fra V24v1, V24v2, V25v1, V25v2 – kortsvarsoppgaver

  // ── V24 Variant 1 ─────────────────────────────────────────────────────────

  {
    id: "v24v1-d2-q13",
    variantGroupId: "v24v1-d2-q13",
    source: "del2",
    examSet: "V24V1",
    topic: "Feil og unntak",
    maxPoints: 5,
    stem: "Hva blir skrevet til skjerm når programmet kjører? Hvorfor er dette resultatet?",
    modelAnswer: `"The character" skrives ut (linje 13 i c()), deretter kaster at(size()) et std::out_of_range-unntak. out_of_range er en underklasse av std::logic_error, ikke std::runtime_error, så catch(std::runtime_error&) i b() fanger det ikke. Unntaket propagerer opp til catch(std::exception&) i a() som skriver "Oh no! Something happened!".

Utskrift:
The character
Oh no! Something happened!`,
    code: `class Secret {
public:
    static void b() {
        try {
            c("Hello World!");
        } catch (const std::runtime_error& e) {
            std::cerr << e.what() << std::endl;
        }
    }
private:
    static void c(std::string characters) {
        std::cout << "The character " << std::endl;
        std::cout << characters.at(characters.size()) << std::endl;
        std::cout << " is at the end of the string" << std::endl;
        throw std::runtime_error("Whoops!");
    }
};
void a() {
    try {
        Secret::b();
    } catch (std::exception& e) {
        std::cerr << "Oh no! Something happened!" << std::endl;
    }
}
int main(void) {
    a();
    return 0;
}`,
    options: [],
  },

  {
    id: "v24v1-d2-q14",
    variantGroupId: "v24v1-d2-q14",
    source: "del2",
    examSet: "V24V1",
    topic: "Funksjoner",
    maxPoints: 5,
    stem: "Forklar kort hvorfor funksjoner er nyttige.",
    modelAnswer: `• Separerer programlogikken – koden deles opp i håndterbare deler.
• Bidrar til bedre lesbarhet.
• Motiverer gjenbruk av kode – samme funksjon kan kalles flere steder.
• Gjør testing av koden enklere (ref. enhetstesting).`,
    options: [],
  },

  {
    id: "v24v1-d2-q15",
    variantGroupId: "v24v1-d2-q15",
    source: "del2",
    examSet: "V24V1",
    topic: "Funksjoner og argumenter",
    maxPoints: 5,
    stem: "Hvordan blir argumentet arr gitt til funksjonen calculateSum? Syns du dette er et godt valg eller ville du ha gjort det på en annen måte? Begrunn svaret kort.",
    modelAnswer: `Argumentet arr gis via referanse (pass-by-reference).

Det er bedre enn pass-by-value siden arrayet er stort og kopiering er kostbart. Derimot ville pass-by-const-reference vært enda bedre, siden funksjonen ikke endrer arrayet – const garanterer dette og signaliserer det tydelig til leseren.`,
    code: `int calculateSum(std::array<int, 10000>& arr) {
    int sum = 0;
    for (int i = 0; i < 10000; ++i) {
        sum += arr[i];
    }
    return sum;
}`,
    options: [],
  },

  {
    id: "v24v1-d2-q16",
    variantGroupId: "v24v1-d2-q16",
    source: "del2",
    examSet: "V24V1",
    topic: "Beholdere",
    maxPoints: 5,
    stem: "Hvorfor bør man ikke bruke []-operatoren til å indeksere et std::map eller et std::unordered_map? Hva burde man gjøre i stedet for?",
    modelAnswer: `[]-operatoren vil implisitt legge inn et nytt element med standardverdi dersom nøkkelen ikke finnes i beholderen. Dette kan introdusere uønskede elementer og skjulte feil.

I stedet bør man bruke:
• std::at() for å lese verdier (kaster std::out_of_range hvis nøkkelen ikke finnes).
• std::insert() for å skrive nye verdier.`,
    options: [],
  },

  {
    id: "v24v1-d2-q17",
    variantGroupId: "v24v1-d2-q17",
    source: "del2",
    examSet: "V24V1",
    topic: "Lagring og pekere",
    maxPoints: 5,
    stem: "Hvorfor er verdiene til a og b ulike?",
    modelAnswer: `Når man aksesserer element på indeks 1 via en peker, beregnes adressen som: startadresse + 1 × sizeof(elementtype).

For int* numbers: elementstørrelsen er sizeof(int) = 4 bytes, så indeks 1 er 4 bytes frem.
For char* characters: elementstørrelsen er sizeof(char) = 1 byte, så indeks 1 er 1 byte frem.

Siden de peker på samme minneblokk men tolker størrelsen ulikt, lander de på ulike minneadresser og får ulike verdier.`,
    code: `void foo(void* ptr) {
    int* numbers = static_cast<int*>(ptr);
    int a = numbers[1];

    char* characters = static_cast<char*>(ptr);
    char b = characters[1];
}

int main(void) {
    char* ptr = new char[]{"hello there"};
    foo(ptr);
    delete[] ptr;
    return 0;
}`,
    options: [],
  },

  {
    id: "v24v1-d2-q18",
    variantGroupId: "v24v1-d2-q18",
    source: "del2",
    examSet: "V24V1",
    topic: "Klasser og arv",
    maxPoints: 10,
    stem: `(a) Hvorfor kompilerer ikke koden? Forklar kort.

(b) Hva må gjøres for at koden skal skrive ut "Hello from B!" gitt at du ikke kan endre noe i main?`,
    modelAnswer: `(a) Koden kompilerer ikke fordi vi bruker override på greeting() i B, men greeting() i A er ikke deklarert virtual. override-nøkkelordet krever at baseklassefunksjonen er virtuell.

(b) Man må legge til virtual foran greeting() i klassen A:
virtual void greeting() { ... }

Da aktiveres virtuell dispatch, og a->greeting() vil kalle B::greeting().`,
    code: `#include <iostream>

class A {
public:
    void greeting() {
        std::cout << "Hello from A!" << std::endl;
    }
};

class B : public A {
public:
    void greeting() override {
        std::cout << "Hello from B!" << std::endl;
    }
};

int main(void) {
    A* a = new B();
    a->greeting();
    delete a;
    return EXIT_SUCCESS;
}`,
    options: [],
  },

  {
    id: "v24v1-d2-q19",
    variantGroupId: "v24v1-d2-q19",
    source: "del2",
    examSet: "V24V1",
    topic: "Constexpr-funksjoner",
    maxPoints: 5,
    stem: "Forklar kort hva en constexpr-funksjon er og hvorfor det kan være nyttig å bruke det.",
    modelAnswer: `En constexpr-funksjon er en funksjon som kompilatoren kan evaluere ved kompileringstid dersom argumentene er kjent ved kompileringstid. Resultatet erstattes da med en konstant verdi i den kompilerte koden, uten kjøretidsevaluering.

Dette kan øke ytelsen (unngår kjøretidskall) og gjøre koden mer lesbar ved å kommunisere at verdien er en kompileringstidskonstant.`,
    options: [],
  },

  {
    id: "v24v1-d2-q20",
    variantGroupId: "v24v1-d2-q20",
    source: "del2",
    examSet: "V24V1",
    topic: "Templates",
    maxPoints: 10,
    stem: `(a) Endre funksjonen add til en template-funksjon så den kan kalles med flere datatyper enn int. Du kan velge å skrive kode eller fortelle hvilke linjer du vil endre og hvordan.

(b) Vil template-funksjonen du skrev fungere for alle typer?`,
    modelAnswer: `(a) template<typename T>
T add(T a, T b) {
    return a + b;
}

(b) Nei. Template-funksjonen vil ikke fungere for typer som ikke har +-operatoren definert (f.eks. egendefinerte klasser uten operator+).`,
    code: `int add(int a, int b) {
    return a + b;
}`,
    options: [],
  },

  {
    id: "v24v1-d2-q21",
    variantGroupId: "v24v1-d2-q21",
    source: "del2",
    examSet: "V24V1",
    topic: "Inn/ut-datahåndtering",
    maxPoints: 5,
    stem: "Forklar kort hvorfor man må gi parameteren std::ostream som en referanse når man overlaster <<-operatoren.",
    modelAnswer: `For å kunne bruke <<-operatoren med alle typer utstrømmer som arver fra std::ostream, inkludert std::cout og std::ofstream. Dersom man brukte std::ofstream, ville operatoren kun fungere med filstrømmer.

I tillegg må referansen returneres slik at man kan kjede sammen utskrifter:
std::cout << a << b << std::endl;`,
    options: [],
  },

  {
    id: "v24v1-d2-q22",
    variantGroupId: "v24v1-d2-q22",
    source: "del2",
    examSet: "V24V1",
    topic: "Kontrollstrukturer",
    maxPoints: 5,
    stem: `Hvorfor blir "Hello World!" printet to ganger selv om flag = false?`,
    modelAnswer: `En do-while-løkke utfører alltid kroppen minst én gang, uavhengig av betingelsen – betingelsen sjekkes etter første kjøring.

I første gjennomgang: "Hello World!" skrives ut, deretter settes flag = !false = true.
Betingelsen (flag) er nå true, løkken kjøres én gang til.
Etter andre gjennomgang: flag = !true = false. Betingelsen er false – løkken stopper.`,
    code: `void printHelloWorld() {
    bool flag = false;

    do {
        std::cout << "Hello World!" << std::endl;
        flag = !flag;
    } while (flag);
}`,
    options: [],
  },

  // ── V24 Variant 2 ─────────────────────────────────────────────────────────

  {
    id: "v24v2-d2-q13",
    variantGroupId: "v24v2-d2-q13",
    source: "del2",
    examSet: "V24V2",
    topic: "Testing",
    maxPoints: 5,
    stem: "Forklar kort forskjellen på enhetstesting (unit testing), systemtesting (system testing) og regresjonstesting (regression testing).",
    modelAnswer: `Enhetstesting: Test av enkeltdeler av programmet, f.eks. én funksjon eller én klasse. Feil er lette å lokalisere.

Systemtesting: Test av hele systemet i sammenheng. Feil er vanskeligere å lokalisere.

Regresjonstesting: Kombinerer enhets- og systemtesting for å sjekke at endringer man har gjort ikke har introdusert nye feil i kode som tidligere fungerte.`,
    options: [],
  },

  {
    id: "v24v2-d2-q14",
    variantGroupId: "v24v2-d2-q14",
    source: "del2",
    examSet: "V24V2",
    topic: "Variabler",
    maxPoints: 5,
    stem: "Hva skjer når man bruker auto nøkkelordet til å deklarere en variabel, og når kan det være nyttig å bruke det?",
    modelAnswer: `Kompilatoren utleder automatisk typen til variabelen fra verdien den tilordnes (typededuksjon). Variabelen får den eksakte typen til uttrykket på høyre side.

Det er nyttig når typen er lang og komplisert, f.eks. ved deklarasjon av iteratorer:
auto it = myMap.begin(); // i stedet for std::map<std::string,int>::iterator it = ...`,
    options: [],
  },

  {
    id: "v24v2-d2-q15",
    variantGroupId: "v24v2-d2-q15",
    source: "del2",
    examSet: "V24V2",
    topic: "Funksjoner og argumenter",
    maxPoints: 5,
    stem: "Hvordan blir argumentene gitt til funksjonen scale? Syns du dette er et godt valg eller ville du gjort det på en annen måte? Begrunn svaret kort.",
    modelAnswer: `Begge argumenter gis via referanse (pass-by-reference).

For number er dette nødvendig siden funksjonen endrer verdien til argumentet.

For factor er det ikke optimalt – factor endres ikke og er én enkel skalar. Pass-by-value ville vært bedre: det er billig å kopiere og kommuniserer tydelig at factor ikke endres.`,
    code: `void scale(double& number, double& factor) {
    number = number * factor;
}`,
    options: [],
  },

  {
    id: "v24v2-d2-q16",
    variantGroupId: "v24v2-d2-q16",
    source: "del2",
    examSet: "V24V2",
    topic: "Referanser",
    maxPoints: 5,
    stem: "Forklar kort hvorfor referanser er nyttige.",
    modelAnswer: `• Man kan lage funksjoner som endrer argumenter direkte (uten å returnere).
• Man kan lage funksjoner med "flere returverdier" via referanseparametere.
• Man unngår unødvendig og kostbar kopiering av store objekter.
• Const-referanser lar oss lese store objekter effektivt uten å gi mulighet for endring.`,
    options: [],
  },

  {
    id: "v24v2-d2-q17",
    variantGroupId: "v24v2-d2-q17",
    source: "del2",
    examSet: "V24V2",
    topic: "Beholdere",
    maxPoints: 5,
    stem: "Hvorfor gir det mening at std::map ikke støtter std::push_back()?",
    modelAnswer: `Elementene i et std::map er alltid sortert etter nøkkel, ikke innsatt i noen bestemt brukerbestemt rekkefølge. push_back() er ment for å legge til et element bakerst i en sekvens, noe som ikke gir mening for en sortert nøkkel-verdi-beholder der elementene plasseres etter nøkkelverdi.`,
    options: [],
  },

  {
    id: "v24v2-d2-q18",
    variantGroupId: "v24v2-d2-q18",
    source: "del2",
    examSet: "V24V2",
    topic: "Lagring og pekere",
    maxPoints: 5,
    stem: "I hvilket minneområde blir de ulike variablene og tilhørende data lagret?",
    modelAnswer: `• print (global bool): statisk lager
• vec og a (std::vector): kontrollinformasjon på stakk, heap-data (innholdet) på heap
• b (int-array / std::map): stakk
• diffN (int): stakk
• ptr (int*): selve pekervariabelen på stakk, minnet den peker på (new int) på heap`,
    code: `#include <iostream>
#include <vector>
#include <map>

bool print = true;

int f(std::vector<int>& vec, std::map<int, int> map, int n) {
    return vec[n] - map[n];
}

int main(void) {
    std::vector<int> a = {1, 3, 18};
    int b[] = {4, 9, 2};

    int diffN = f(a, b, 1);

    int* ptr = new int(1);
    *ptr = diffN;

    if (print) {
        std::cout << *ptr << std::endl;
    }

    delete ptr;
    return 0;
}`,
    options: [],
  },

  {
    id: "v24v2-d2-q19",
    variantGroupId: "v24v2-d2-q19",
    source: "del2",
    examSet: "V24V2",
    topic: "Klasser og arv",
    maxPoints: 10,
    stem: `(a) Hvorfor kompilerer ikke koden? Forklar kort.

(b) Hva må gjøres for å løse problemet gitt at du ikke kan endre noe i main?`,
    modelAnswer: `(a) Koden kompilerer ikke fordi vi prøver å lage et objekt av den abstrakte klassen B. B arver den rene virtuelle funksjonen foo() = 0 fra A uten å overstyre den, noe som gjør B abstrakt.

(b) Den rene virtuelle funksjonen foo() må overstyres (implementeres) i klassen B:
void foo() override { std::cout << "foo" << std::endl; }`,
    code: `#include <iostream>

class A {
private:
    int x;
    int y;
public:
    virtual void foo() = 0;
    virtual void bar() const;
    A(int x_, int y_) : x(x_), y(y_) {}
};

class B : public A {
public:
    B(int x_, int y_) : A(x_, y_) {}
    void bar() const override {
        std::cout << "bar" << std::endl;
    }
};

class C : public B {
public:
    C(int x_, int y_) : B(x_, y_) {}
    void foo() override {
        std::cout << "foo" << std::endl;
    }
};

int main(void) {
    B b(3, 4);
    C c(5, 6);
    c.foo();
    b.bar();
    return 0;
}`,
    options: [],
  },

  {
    id: "v24v2-d2-q20",
    variantGroupId: "v24v2-d2-q20",
    source: "del2",
    examSet: "V24V2",
    topic: "Header-filer",
    maxPoints: 5,
    stem: "Under er kode i tre filer f1.h, f2.h og main.cpp. Hva er problemet og hva ville du gjort for å fikse det uten å fjerne eller flytte på koden som står der?",
    modelAnswer: `Problemet er at funksjonen get_pi() defineres to ganger i main.cpp: én gang via #include "f1.h" direkte, og én gang indirekte via #include "f2.h" (som inkluderer f1.h). Dette gir en multiple definition-feil under kompilering/linking.

Løsning: Legg til #pragma once øverst i f1.h. Da inkluderes f1.h kun én gang per kompileringsenhet.`,
    code: `// f1.h
double get_pi() {
    return 3.14;
}

// f2.h
#include "f1.h"

double area(double r) {
    double pi = get_pi();
    return r * pi * pi;
}

// main.cpp
#include "f1.h"
#include "f2.h"
#include <iostream>

int main() {
    std::cout << area(5.0) << std::endl;
    return 0;
}`,
    options: [],
  },

  {
    id: "v24v2-d2-q21",
    variantGroupId: "v24v2-d2-q21",
    source: "del2",
    examSet: "V24V2",
    topic: "Templates",
    maxPoints: 10,
    stem: `(a) Endre Point-klassen til en template-klasse slik at vi kan ha ulike datatyper for koordinatene x og y. Du kan velge å skrive kode eller fortelle hvilke linjer du vil endre og hvordan.

(b) Hva kan være fordelen ved å ha Point som en template-klasse?`,
    modelAnswer: `(a) template<typename T>
class Point {
    T x = 0;
    T y = 0;
public:
    T getX() {
        return x;
    }
    T getY() {
        return y;
    }
};

(b) Koden kan gjenbrukes for ulike typer koordinater (f.eks. int, float, double) uten å måtte skrive separate klasser for hver type.`,
    code: `class Point {
    int x = 0;
    int y = 0;
public:
    int getX() {
        return x;
    }

    int getY() {
        return y;
    }
};`,
    options: [],
  },

  {
    id: "v24v2-d2-q22",
    variantGroupId: "v24v2-d2-q22",
    source: "del2",
    examSet: "V24V2",
    topic: "Inn/ut-datahåndtering",
    maxPoints: 5,
    stem: "Forklar kort forskjellen mellom virkemåten til >>-operatoren og get_line().",
    modelAnswer: `>>-operatoren leser inndata frem til en typekonflikt eller whitespace (mellomrom, tabulator, linjeskift). For eksempel leser den kun ett ord om gangen fra en tekststrøm.

get_line() leser en hel linje med tekst (inkludert mellomrom) og stopper ved linjeskifttegnet (\n). Linjeskiftet konsumeres men lagres ikke i strengen.`,
    options: [],
  },

  // ── V25 Variant 1 ─────────────────────────────────────────────────────────

  {
    id: "v25v1-d2-q13",
    variantGroupId: "v25v1-d2-q13",
    source: "del2",
    examSet: "V25V1",
    topic: "Feilsøking",
    maxPoints: 5,
    stem: "Denne funksjonen inneholder en bugg. Beskriv problemet, og forklar hvordan det kan løses.",
    modelAnswer: `Buggen er at variabelen sum ikke er initialisert. Den har en udefinert verdi (garbage value) ved oppstart, noe som gir udefinert atferd – resultatet av funksjonen er uforutsigbart.

Løsning: Initialiser sum til 0:
int sum = 0;`,
    code: `int computeSum(const std::vector<int>& list) {
    int sum;
    for(int i = 1; i <= list.size(); i += 1) {
        sum += list.at(i - 1);
    }
    return sum;
}`,
    options: [],
  },

  {
    id: "v25v1-d2-q14",
    variantGroupId: "v25v1-d2-q14",
    source: "del2",
    examSet: "V25V1",
    topic: "Løkker",
    maxPoints: 5,
    stem: "Løkken kjører aldri ferdig. Forklar hvorfor, og hvordan problemet kan løses.",
    modelAnswer: `Betingelsen i >= 0 er alltid sann fordi i er av typen unsigned int, som aldri kan bli negativ. Når i er 0 og dekrementeres (i--), wrapper verdien rundt til det største mulige unsigned int-tallet (typisk 4294967295), og løkken fortsetter i det uendelige.

Løsning: Endre unsigned int til int:
for(int i = 10; i >= 0; i--)`,
    code: `for(unsigned int i = 10; i >= 0; i--) {
    std::cout << i << std::endl;
}`,
    options: [],
  },

  {
    id: "v25v1-d2-q15",
    variantGroupId: "v25v1-d2-q15",
    source: "del2",
    examSet: "V25V1",
    topic: "Byggeverktøy",
    maxPoints: 5,
    stem: `Meson-programmet "konfigurerer" et prosjekt. Hva er resultatet (produktet) av denne prosessen? Hva kan være en grunn til å bruke Meson i et prosjekt?`,
    modelAnswer: `Resultatet av konfigureringen er et sett med byggefiler (f.eks. for byggeverktøyet Ninja) som beskriver nøyaktig hvordan prosjektet skal kompileres og lenkes.

Grunner til å bruke Meson:
• Forenkler byggeprosessen – man slipper å skrive komplekse Makefiler.
• Håndterer avhengigheter automatisk.
• Gjør det enklere å bygge prosjektet på tvers av ulike plattformer og operativsystemer.`,
    options: [],
  },

  {
    id: "v25v1-d2-q16",
    variantGroupId: "v25v1-d2-q16",
    source: "del2",
    examSet: "V25V1",
    topic: "Referanser",
    maxPoints: 5,
    stem: `Beskriv en situasjon hvor det er ønskelig å bruke "pass-by-const-reference" fremfor "pass-by-reference".`,
    modelAnswer: `Pass-by-const-reference er ønskelig når man vil sende et stort objekt til en funksjon uten å kopiere det (for effektivitet), men funksjonen ikke trenger å endre på objektet.

Eksempel: void print(const std::vector<int>& data)

Her er data stor og kopiering er kostbar. const-referansen gir lesbar tilgang uten kopiering, og const hindrer utilsiktet endring.`,
    options: [],
  },

  {
    id: "v25v1-d2-q17",
    variantGroupId: "v25v1-d2-q17",
    source: "del2",
    examSet: "V25V1",
    topic: "Inn/ut-datahåndtering",
    maxPoints: 5,
    stem: "Når utskriftoperatoren (<<) skal overlastes, må et av parameterene være en instans av std::ostream. Forklar hvorfor denne ikke bør være en instanse av std::ofstream i stedet.",
    modelAnswer: `std::ofstream er en spesifikk strømtype som kun skriver til filer. Dersom man bruker std::ofstream som parameter, kan <<-operatoren kun brukes med filstrømmer.

Ved å bruke std::ostream (basisklassen som std::cout og std::ofstream begge arver fra) fungerer operatoren med alle utstrømtyper. Slik kan man f.eks. skrive til terminalen (std::cout) og til fil (std::ofstream) med samme operator.`,
    options: [],
  },

  {
    id: "v25v1-d2-q18",
    variantGroupId: "v25v1-d2-q18",
    source: "del2",
    examSet: "V25V1",
    topic: "Minnehåndtering",
    maxPoints: 5,
    stem: "Skriv en funksjon som forårsaker en minnelekkasje (memory leak).",
    modelAnswer: `void leak() {
    int* ptr = new int{5};
    // delete ptr; mangler
}

En minnelekkasje oppstår fordi minnet allokert med new aldri frigjøres med delete. Når funksjonen returnerer, mister programmet pekeren til minneblokken, men minnet er fortsatt reservert og utilgjengelig for resten av programmet.`,
    options: [],
  },

  {
    id: "v25v1-d2-q19",
    variantGroupId: "v25v1-d2-q19",
    source: "del2",
    examSet: "V25V1",
    topic: "Kopiering",
    maxPoints: 5,
    stem: "Hva er forskjellen mellom en dyp kopi (deep copy), og en overfladisk kopi (shallow copy)?",
    modelAnswer: `Grunn kopi (shallow copy): Kopierer kun pekeren (minneadressen), ikke dataene den peker på. Begge pekerne refererer til samme objekt i minnet – endring via én peker påvirker den andre.

Dyp kopi (deep copy): Kopierer selve dataene til et nytt minnested. De to pekerne refererer til separate objekter – endringer i én påvirker ikke den andre.`,
    options: [],
  },

  {
    id: "v25v1-d2-q20",
    variantGroupId: "v25v1-d2-q20",
    source: "del2",
    examSet: "V25V1",
    topic: "Kontrollstrukturer",
    maxPoints: 10,
    stem: "Omskriv prefixSum()-funksjonen til én enkel løkke i main()-funksjonen.",
    modelAnswer: `std::vector<int> numbers = {1, 6, 3, 8, 4, 6, 3, 3, 2, 7};
for (int i = 1; i < (int)numbers.size(); i++) {
    numbers.at(i) = numbers.at(i) + numbers.at(i - 1);
}`,
    code: `#include <vector>

int prefixSum(std::vector<int>& vec, int index) {
    if(index == 0) {
        return vec.at(0);
    }
    vec.at(index) = vec.at(index) + prefixSum(vec, index - 1);
    return vec.at(index);
}

int main() {
    std::vector<int> numbers = {1, 6, 3, 8, 4, 6, 3, 3, 2, 7};
    prefixSum(numbers, numbers.size() - 1);
    return 0;
}`,
    options: [],
  },

  {
    id: "v25v1-d2-q21",
    variantGroupId: "v25v1-d2-q21",
    source: "del2",
    examSet: "V25V1",
    topic: "Ytelse",
    maxPoints: 5,
    stem: "Dette programmet kjører mye raskere når linjen som er kommentert ut blir tatt med i programmet. Forklar hvorfor.",
    modelAnswer: `vec.reserve(length) reserverer plass til length elementer på forhånd, uten å endre størrelsen (size).

Uten reserve(): Hver gang vektoren er full og push_back() kalles, må vektoren re-allokere et nytt og større minneområde og kopiere alle eksisterende elementer dit. Dette skjer O(log n) ganger og er svært kostbart for 1 milliard elementer.

Med reserve(): All nødvendig plass allokeres én gang. push_back() kan alltid legge til elementer uten re-allokering.`,
    code: `std::vector<int> vec;
const unsigned long length = 1000000000;

// vec.reserve(length);

for(unsigned long i = 0; i < length; i++) {
    vec.push_back(5);
}`,
    options: [],
  },

  {
    id: "v25v1-d2-q22",
    variantGroupId: "v25v1-d2-q22",
    source: "del2",
    examSet: "V25V1",
    topic: "Header-filer",
    maxPoints: 10,
    stem: "Hva gjør #pragma once direktivet, og hva er hovedproblemet som den løser?",
    modelAnswer: `#pragma once er et preprosessordirektiv som sikrer at en header-fil kun inkluderes én gang per kompileringsenhet, selv om den inkluderes indirekte via flere andre header-filer.

Hovedproblemet det løser er dobbel inkludering (multiple inclusion): dersom en header inkluderes to ganger i samme kompileringsenhet, vil klasser og funksjoner defineres to ganger, noe som gir kompileringsfeil.

Alternativet er include-guards (#ifndef / #define / #endif), men #pragma once er kortere og mindre feilutsatt.`,
    options: [],
  },

  // ── V25 Variant 2 ─────────────────────────────────────────────────────────

  {
    id: "v25v2-d2-q13",
    variantGroupId: "v25v2-d2-q13",
    source: "del2",
    examSet: "V25V2",
    topic: "Referanser og pekere",
    maxPoints: 5,
    stem: "Gi en likhet og et forskjell mellom en referanse og en peker.",
    modelAnswer: `Likhet: Begge gir tilgang til et objekt uten å kopiere det – de peker til/refererer samme minnested.

Forskjell: En peker kan re-assignes til å peke på andre objekter og kan være nullptr. En referanse er alltid bundet til det samme objektet fra initialisering og kan ikke re-assignes eller være "null".`,
    options: [],
  },

  {
    id: "v25v2-d2-q14",
    variantGroupId: "v25v2-d2-q14",
    source: "del2",
    examSet: "V25V2",
    topic: "Constexpr",
    maxPoints: 5,
    stem: "En funksjon returnerer en verdi med datatype constexpr float. Forklar hva constexpr forteller deg i denne situasjonen.",
    modelAnswer: `constexpr på returtypen betyr at funksjonen potensielt kan evalueres av kompilatoren ved kompileringstid, ikke ved kjøretid – dersom alle argumenter er kjent ved kompileringstid. Resultatet erstattes da med en konstant verdi i den kompilerte koden.

Dette kan øke ytelsen ved å eliminere kjøretidskall, og kommuniserer tydelig at resultatet er en kompileringstidskonstant.`,
    options: [],
  },

  {
    id: "v25v2-d2-q15",
    variantGroupId: "v25v2-d2-q15",
    source: "del2",
    examSet: "V25V2",
    topic: "Klasser og tilgangsnivå",
    maxPoints: 5,
    stem: "Forklar under hvilke betingelser en metode som er markert public, private, eller protected kan kalles.",
    modelAnswer: `public: Kan kalles fra hvorsomhelst – fra klassen selv, fra barneklasser, og fra ekstern kode utenfor klassen.

private: Kan bare kalles fra innsiden av klassen selv. Ikke tilgjengelig for barneklasser eller ekstern kode.

protected: Kan kalles fra klassen selv og fra barneklasser (arvede klasser), men ikke fra ekstern kode.`,
    options: [],
  },

  {
    id: "v25v2-d2-q16",
    variantGroupId: "v25v2-d2-q16",
    source: "del2",
    examSet: "V25V2",
    topic: "Inn/ut-datahåndtering",
    maxPoints: 5,
    stem: "Forklar hvordan funksjonsoverlasting gjør det mulig å skrive ut verdier med ulike datatyper (f.eks. std::string eller int) med utskrift-operatoren (<<).",
    modelAnswer: `Funksjonsoverlasting lar oss definere flere versjoner av <<-operatoren med ulike parametertyper. Kompilatoren velger automatisk riktig versjon basert på typen til argumentet ved kompileringstid.

Standardbiblioteket definerer separate overlastinger for int, double, std::string, osv. Slik kan den samme operatoren (<<) brukes for alle disse typene uten at kallet er tvetydig.`,
    options: [],
  },

  {
    id: "v25v2-d2-q17",
    variantGroupId: "v25v2-d2-q17",
    source: "del2",
    examSet: "V25V2",
    topic: "Ytelse",
    maxPoints: 5,
    stem: "Du er gitt et program som kjører tregt og blir spurt å gjøre den raskere. Gi to eksempler på faktorer som kan gjøre at et program kjører langt tregere enn det som teoretisk hadde vært mulig.",
    modelAnswer: `1. Unødvendig re-allokering av minne: F.eks. push_back() på en std::vector uten reserve() fører til gjentatte kopieringer av alle elementer ettersom kapasiteten overskrides.

2. Cache-misser: Tilfeldig (ikke-sekvensielt) minneaksess gir hyppige cache-misser, noe som gjør at data må hentes fra RAM (mye langsommere enn cache).

Andre eksempler: unødvendig kopiering av store objekter ved pass-by-value, bruk av []-operatoren på std::map (implisitt innsetting), overbruk av virtuelle funksjoner i kritiske indre løkker.`,
    options: [],
  },

  {
    id: "v25v2-d2-q18",
    variantGroupId: "v25v2-d2-q18",
    source: "del2",
    examSet: "V25V2",
    topic: "Callbacks",
    maxPoints: 5,
    stem: "Forklar hva en callback er, og gi et eksempel hvor den kan brukes.",
    modelAnswer: `En callback er en funksjon som sendes som argument til en annen funksjon, og kalles av den mottakende funksjonen på et bestemt tidspunkt eller ved en bestemt hendelse.

Eksempel 1: I AnimationWindow kan man registrere en callback-funksjon som kalles automatisk av event-loopen når en knapp trykkes.

Eksempel 2: std::sort tar en sammenligningsfunksjon (callback) som bestemmer sorteringsrekkefølgen.`,
    options: [],
  },

  {
    id: "v25v2-d2-q19",
    variantGroupId: "v25v2-d2-q19",
    source: "del2",
    examSet: "V25V2",
    topic: "Beholdere",
    maxPoints: 5,
    stem: "Du ønsker å telle hvor ofte hvert ord forekommer i en tekst. Hvilken beholder fra standardbiblioteket (STL) hadde du brukt for dette? Begrunn svaret.",
    modelAnswer: `std::map<std::string, int> eller std::unordered_map<std::string, int>.

Disse beholderene lagrer nøkkel-verdi-par der nøkkelen er ordet og verdien er antall forekomster. Man kan enkelt øke telleren: wordCount[word]++.

std::unordered_map gir O(1) gjennomsnittlig oppslagstid. std::map gir O(log n) men holder nøklene alfabetisk sortert.`,
    options: [],
  },

  {
    id: "v25v2-d2-q20",
    variantGroupId: "v25v2-d2-q20",
    source: "del2",
    examSet: "V25V2",
    topic: "Navnerom",
    maxPoints: 5,
    stem: "Hva er et navnerom, og hvorfor kan den være ønskelig å bruke?",
    modelAnswer: `Et navnerom (namespace) er en mekanisme for å gruppere relaterte identifikatorer (funksjoner, klasser, variabler) under et felles navn for å unngå navnekonflikter.

Det er ønskelig å bruke navnerom i større prosjekter eller når man kombinerer kode fra ulike biblioteker som kan ha like funksjonsnavn. Standardbiblioteket bruker f.eks. navnerommet std for å unngå konflikter med brukerens egne funksjoner.`,
    options: [],
  },

  {
    id: "v25v2-d2-q21",
    variantGroupId: "v25v2-d2-q21",
    source: "del2",
    examSet: "V25V2",
    topic: "Kontrollstrukturer",
    maxPoints: 10,
    stem: "Skriv en tilsvarende while-løkke.",
    modelAnswer: `int n = 10000;
int i = 2;
while (i * i < n) {
    n /= 3;
    i -= 5;
    std::cout << n << std::endl;
    i++;
}`,
    code: `int n = 10000;
for(int i = 2; i * i < n; i++) {
    n /= 3;
    i -= 5;
    std::cout << n << std::endl;
}`,
    options: [],
  },

  {
    id: "v25v2-d2-q22",
    variantGroupId: "v25v2-d2-q22",
    source: "del2",
    examSet: "V25V2",
    topic: "Beholdere",
    maxPoints: 10,
    stem: "Forklar de viktigste stegene som kjøres av implementasjonen av push_back()-metoden i en std::vector.",
    modelAnswer: `1. Sjekk om det er ledig kapasitet: er size < capacity?
2. Hvis ja (kapasitet finnes): plasser det nye elementet på indeks size og øk size med 1.
3. Hvis nei (full kapasitet): alloker et nytt, større minneområde (typisk dobbelt så stor kapasitet). Kopier eller flytt alle eksisterende elementer til det nye området. Legg til det nye elementet. Frigjør det gamle minneområdet. Oppdater interne pekere, size og capacity.`,
    options: [],
  },
];

const hintMap: Record<string, string> = {
  "v24v1-q1": "Tenk nøye på hva kompilatoren lager og hva linkeren gjør etterpå – det er to ulike steg med ulike ansvarsområder.",
  "v24v2-q1": "C++ kompileres til maskinkode for én bestemt plattform. Og selv om programmet kompilerer, kan det fortsatt feile under kjøring.",
  "v25v2-q4": "Tre steg: kompilering oversetter kildekode, linking setter sammen objektfiler. Syntaksfeil oppdages tidlig – men av hvem?",
  "v25v1-q4": "Kildekoden leses fra topp til bunn. Hva er vanlig konvensjon for hva som hører hjemme i .h vs .cpp? Og hva gjør #include med preprosessoren?",
  "v24v1-q2": "Heltallsdivisjon avkorter mot null – ikke avrunder. Og husk: signed og unsigned int bruker like mange bits, men tolker dem ulikt.",
  "v25v2-q2": "Konvertering fra float til double mister ingenting (utvidende). Hva skjer ved flytallsaritmetikk? Hva skjer med unsigned ved underflyt?",
  "v25v1-q2": "Skille mellom type (klassen/blueprint) og objekt (en instans). Navnerom lar deg gjenbruke navn i separate skop.",
  "v25v1-q1": "Flytall lagres med begrenset presisjon i binær IEEE 754-format. Er de like tette overalt på tallinja? Og finnes det spesialverdier?",
  "v25v2-q1": "float=32 bit, double=64 bit. Er double virkelig bare 'dobbelt' av float i antall representable tall? Og hva er maksverdien for unsigned vs signed int?",
  "v24v1-q3": "Les kodeblokken lag for lag: hva er innenfor namespace foo {}, hva er innenfor f() {}, og hva er innenfor for-løkken {}?",
  "v24v2-q4": "Klasser kan defineres i globalt skop og inne i funksjoner. Husk at :: lar deg definere en medlemsfunksjon utenfor klassen.",
  "v24v1-q4": "RAII krever at ressursen frigjøres automatisk i destruktøren. Har klasse A en destruktør som kaller delete på ptr?",
  "v24v2-q5": "Hvem eier den allokerte int*? std::vector er et RAII-objekt – hva skjer med den når bar() returnerer?",
  "custom-raii-1": "Hva garanterer RAII når et unntak kastes? Kalles destruktøren til lokale objekter på stakken under stack unwinding?",
  "v24v1-q5": "Kompilatoren genererer alltid en destruktør om du ikke skriver en selv. Destruktøren kalles automatisk – ikke eksplisitt.",
  "v24v2-q7": "En ren virtuell funksjon (= 0) gjør klassen abstrakt – det kan ikke lages instanser direkte. Hva tvinger det barneklasser til?",
  "v24v1-q6": "Unntak kastes med throw og fanges med catch. try markerer kode som kan feile. Unntak er et kjøretidsfenomen, ikke kompileringstid.",
  "v24v2-q8": "Hva frigjøres automatisk via RAII ved unntak, og hva frigjøres ikke? Hva kaster at() om indeksen er utenfor rekkevidde?",
  "v25v1-q11": "Unntak propagerer oppover i kallstakken til de fanges. En catch(std::exception&) bruker arv og polymorfi – hvilke unntak matcher den?",
  "v25v2-q7": "throw kan brukes overalt i koden. Unntak er et kjøretidsfenomen. Kan én catch fange mange typer via arvehierarkiet?",
  "v24v1-q7": "Skill mellom pekerens adresse (hva b inneholder) og verdien den peker til (*b). Hva gjør ++ på en peker vs. ++ på en vanlig variabel?",
  "v24v2-q9": "Husk: & gir adressen til en variabel. * derefererer pekeren (gir verdien). Er ptr[0] og *(ptr+0) det samme?",
  "lf-q9": "En peker er bare et tall – en minneadresse. Den kan peke til gyldig eller ugyldig minne. Hva trenger du for å endre verdien den peker til?",
  "v24v1-q8": "Grunn kopiering: kopier adressen slik at begge pekere deler objektet. Dyp kopiering: lag et nytt objekt med ny minneplass.",
  "v24v2-q10": "new double{*euler1} – hva gjør * her? Lages det et helt nytt minneobjekt, eller kopieres bare adressen?",
  "custom-kopiering-1": "y = x er en pekertilordning – begge peker nå på samme minnelokasjon. new int{*x} kopierer verdien til en ny minneplass.",
  "v24v1-q9": "friend gir tilgang til alle tilgangsnivåer. Arves friend-relasjoner til barneklasser? Kan en friend-funksjon være i en annen klasse?",
  "v24v2-q11": "Husk: public=alle, protected=klassen og barneklasser, private=kun klassen selv. Hva kan abstrakte klasser ha?",
  "lf-q11": "friend gir tilgang til private medlemmer. Hvilken operator deklareres typisk som friend for å muliggjøre utskrift?",
  "v25v1-q9": "friend deklareres inne i klassen. Gjelder det bare for funksjoner, eller kan hele klasser også erklæres som friend?",
  "v24v1-q10": "std::set er sortert og inneholder unike elementer. Hvilken funksjon bruker man for å legge til et element – push_back eller noe annet?",
  "v24v2-q12": "size() = faktiske elementer, capacity() = allokert plass. Hva trigger reallokering? Endrer push_back alltid kapasiteten?",
  "v24v1-q11": "Templates instansieres ved kompilering, så kompilatoren trenger hele definisjonen tilgjengelig. Kan kompilatoren utlede typeparametere fra argumentene?",
  "v25v2-q10": "std::array<int, 10> bruker et heltall som template-parameter. Kan templates ta inn mer enn én typeparameter?",
  "v24v1-q12": "Callback-funksjoner i AnimationWindow har en fast signatur: void(). Ingen parametere, ingen returverdi.",
  "v25v1-q5": "Hvis foreldreklassen ikke har en default-konstruktør, hva må barneklassen gjøre? Og kan en klasse ha flere konstruktører?",
  "v25v2-q6": "En kopikonstruktør tar en const-referanse til samme type. En default-konstruktør tar ingen parametere. Hva er standardsynligheten i en klasse?",
  "v25v1-q3": "new int{n} (enkelt objekt) bruker delete, mens new int[n] (array) bruker delete[]. Hva garanterer RAII for lokale objekter ved unntak?",
  "lf-q6": "Minnet allokeres én gang, men delete[] kalles inne i en løkke. Hva kaller man fenomenet med å frigjøre samme minne mer enn én gang?",
  "lf-q7a": "unique_ptr-objektet selv ligger på stack, men Book-objektet det eier er på heap. Hva skjer med heap-minnet når unique_ptr går ut av skop?",
  "v25v2-q11": "new → heap. Lokale variabler og std::array → stack. Hva med elementene i std::vector? Og kan smartpekere brukes trygt på stakk-objekter?",
  "v25v1-q6": "RAII: destruktøren kalles automatisk for stack-objekter når de går ut av skop. Hva med objekter allokert med new via en rå peker?",
  "v25v1-q8": "En abstrakt klasse har minst én ren virtuell funksjon. Hva skjer om en barneklasse ikke implementerer alle rene virtuelle metoder?",
  "v25v2-q9": "Arv er transitiv. Nedkonvertering (foreldre → barn) krever eksplisitt cast og er risikabelt. Hva gjør en klasse abstrakt?",
  "v25v1-q10": "Deklarasjon sier at noe finnes. Definisjon gir implementasjonen. ODR: én definisjon er tillatt, men mange deklarasjoner er OK.",
  "v25v2-q5": "Linje 1 er en fremoverdeklarasjon av b(). Den lar a() bruke b() selv om b() defineres lenger ned i filen.",
  "v24v2-q3": "Deklarasjoner kan gjentas fritt – definisjoner er begrenset av ODR (One Definition Rule). Hva gjelder for klasser vs. funksjoner?",
  "v24v2-q2": "int→float er trygt (utvidende konvertering). float→int avkorter desimaldelen – det er alltid tap. Kan du alltid velge eksplisitt cast?",
  "v25v1-q12": "for og while sjekker betingelsen FØR kroppen kjøres, så de kan kjøre null ganger. Hva gjør continue, og hva er alternativet som alltid kjører én gang?",
  "v25v2-q3": "engine er seeded med 0 – et fast tall, ikke std::random_device. Hva betyr det for sekvensen av tall ved hver kjøring?",
  "v25v2-q8": "#include er en tekstlig erstatning utført av preprosessoren. #pragma once handler om hva som skjer når samme header inkluderes flere ganger.",
  "lf-q2": "constexpr på en variabel tvinger kompileringstidsevaluering. constexpr på en funksjon tillater det – men krever det ikke i alle sammenhenger.",
  "lf-q1": "Hva trenger kompilatoren absolutt for å reservere riktig minneplass og la deg referere til variabelen i koden? Tenk minimalt.",
  "lf-q4": "Egendefinerte typer er typer du definerer selv, i motsetning til innebygde typer som int og double.",
  "v25v2-q12": "int a; uten initialisering har en udefinert verdi. Hva er verdien av argc når programmet kjøres uten ekstra argumenter? Hva returnerer C() uten argument?",
  "v24v2-q6": "En klasse kan inneholde mange ulike ting – data og funksjoner, samt statiske varianter av begge.",
  "tw-kl2": "Preprosessoren kjøres FØR kompilatoren. Objektfiler er mellomprodukter – ikke ferdige programmer. Hva kan gå galt i lenke-steget?",
  "tw-kl3": "Husk: #include er tekstlig kopiering – det påvirker ikke kompileringsrekkefølgen for andre filer. Hva gjør inline med ODR?",
  "tw-dt2": "struct og class er nesten like – én konkret teknisk forskjell skiller dem. Hva gir enum class som vanlig enum ikke gir?",
  "tw-raii2": "RAII handler om destruktøren, ikke om en manuell close()-metode. Hva skjer med stack-objekter når et unntak kastes?",
  "tw-pek2": "const int* og int* const er speilbilder: en låser verdien, den andre låser adressen. Hvilken er hvilken?",
  "tw-kop2": "Struct uten pekere koperes alltid dypt av kompilatoren. Endrer du kopien, er originalen upåvirket.",
  "tw-til2": "friend arves ikke – det er ett av de tingene som ikke følger med til barneklassen. Hva kan protected gi barneklassen som private ikke kan?",
  "tw-til3": "Arvetypen (public/protected/private) bestemmer hvilken synlighet A's membere får i B. B's egne metoder er ikke begrenset av arvetypen.",
  "tw-gui1": "AnimationWindow-vinduer kan ha mange widgets. Callback-funksjoner er void() og kalles automatisk av event-loopen.",
  "tw-min1": "delete og delete[] er ikke like – de rydder minnet ulikt. Hva er konsekvensen av å bruke feil variant?",
  "tw-min2": "Lokale variabler lever på stakken og frigjøres når funksjonen returnerer. Hva skjer med en peker til en slik variabel etter at funksjonen er ferdig?",
  "tw-sp1": "unique_ptr kan ikke kopieres – bare flyttes (move). shared_ptr bruker referansetelling. Hva skjer med objektet når siste shared_ptr destrueres?",
  "tw-abs1": "En ren virtuell funksjon (= 0) gjør klassen abstrakt. Virtuelle funksjoner krever et lite vtable-oppslag – er det gratis?",
  "tw-arv1": "Virtuell dispatch brukes bare når funksjonen er merket virtual i baseklassen. Ikke-virtuelle funksjoner binder til typen pekeren er deklarert som.",
  "tw-dd2": "Inline-funksjoner og template-definisjoner er unntak fra ODR – de MÅ ligge i header-filer. Hva gjør extern for globale variabler?",
  "tw-typ1": "static_cast<int> avkorter mot null – den runder ikke av. dynamic_cast sjekker typen ved kjøretid og er tryggere for nedkonvertering.",
  "tw-lok1": "do-while kjører alltid minst én gang. break avslutter bare den innerste løkken. Fungerer range-for med vanlige C++-arrays?",
  "tw-rnd1": "std::random_device gir (typisk) ekte entropi, ikke en fast seed. Distribusjonen [1,6] er inklusiv i begge ender.",
  "tw-dir1": "#define er preprosessordirektiv – erstatningen skjer FØR kompilatoren ser koden. Makroer kan ta parametere akkurat som funksjoner.",
  "tw-cx1": "constexpr-variabel er alltid kjent ved kompileringstid. const-variabel kan ha kjøretidsverdi. Kan en constexpr-funksjon kalles med kjøretidsargumenter?",
  "tw-vd1": "auto krever alltid en initialiseringsverdi. Braced-init {} avviser narrowing – int x{3.9} kompilerer ikke, int x = 3.9 gjør det.",
  "tw-et1": "struct og class er nesten identiske i C++, bortsett fra standardsynligheten. En struct kan godt arve fra en annen struct.",
  "tw-uv1": "Felter med = 0 eller {} er eksplisitt initialisert. Felt uten initializer i en default-initialisert struct er udefinert – ikke automatisk null.",
  "tw-km1": "Statiske klassemedlemmer tilhører klassen, ikke instansen. En statisk funksjon har ingen this-peker – hva begrenser det?",
  "d2-ref-1": "Er b en kopi av a, eller et annet navn på samme minneplass?",
  "d2-ptr-1": "arr+1 er pekeraritmetikk – hvilken indeks peker det på?",
  "d2-arv-1": "f() er merket virtual. Hva bestemmer hvilken implementasjon som kalles – pekerens type eller objektets type?",
  "d2-lambda-1": "[n] fanger by value. Når skjer kopieringen – ved opprettelse eller ved kall?",
  "d2-auto-ret-1": "Hva er resultatet av int + double i C++?",
  "d2-constptr-1": "Hva ville skje hvis du kunne endre *p – ville const x da fortsatt være const?",
  "d2-rekursjon-1": "Spor kallet steg for steg: f(4) → f(3) → f(2) → f(1).",
  "d2-vector-1": "push_back legger til ett, pop_back fjerner ett. Hva er nettoresultatet?",
  "d2-uptr-1": "unique_ptr kan ikke kopieres. Hva skjer med kilden etter std::move?",
  "d2-substr-1": "substr(pos, len): pos er startindeks, len er antall tegn.",
  "d2-template-1": "Hva kreves mellom template< > – kan T stå alene?",
  "d2-ub-arr-1": "Rå arrays har ingen grensekontroll. Hva er det C++ kaller et slikt resultat?",
  "d2-loop-cont-1": "continue avbryter inneværende iterasjon. Hvilke verdier er partall (i%2==0)?",
  "d2-struct-def-1": "int x = 1 inne i struct er en default member initializer – hva er verdien til p.x?",
  "d2-missing-return-1": "Returtypen er std::string. Hvilke av alternativene er en gyldig std::string-verdi?",
  "d2-scope-1": "i er deklarert inne i for( ). Hvor lenge lever den?",
  "d2-delete-arr-1": "new int[n] og new int er ulike allokeringer. Hvilken delete passer til hvilken?",
  "d2-static-var-1": "static lokal variabel initialiseres bare én gang. Hva er count-verdien etter hvert kall?",
  "d2-exception-1": "catch-blokker evalueres i rekkefølge. Hva er typen til 42?",
  "d2-constructor-1": "Initialisererlisten : name{n} – hva er n i dette kallet?",
};

const codeAnnotatedMap: Record<string, string> = {
  "v24v1-q3": `namespace foo {             // navnerom 'foo' – er i globalt skop
    int x;                  // variabel x tilhører foo-skopet (ikke lokalt)
    int bar() { return x; } // bar() aksesseres utenfra som foo::bar()
}

int f(int y) {              // funksjon f – y er lokal parameter til f
    int z = 0;              // z er lokal i f(), IKKE begrenset til for-løkken
    for (int i = 0; i < 10; i++) { // i er lokal til for-løkken
        z += i * y;         // z og y er tilgjengelige her
    }
    return z;               // z tilgjengelig her – lever i hele f()
}`,

  "v24v1-q4": `class A {
    int *ptr;           // privat rå peker – ingen automatisk ressursstyring
public:
    A(int val) {        // konstruktør: anskaffer ressurs med new
        ptr = new int(val); // allokerer int på heap
    }

    void delete() {     // manuell frigjøring – dette er IKKE en destruktør
        delete ptr;     // kalles ikke automatisk → ikke RAII
    }
};                      // ingen ~A() → ingen automatisk frigjøring av ptr`,

  "v24v2-q5": `int* foo(int a) {
    int *ptr = new int(a); // allokerer int på heap
    return ptr;            // returnerer peker – eierskap overføres IKKE
}

void bar(int b) {
    int* ptr = foo(b);         // mottar peker, men delete kalles aldri → lekkasje!
    std::vector<int> vec;      // RAII-objekt: frigjør eget heap-minne automatisk
    vec.push_back(b);          // legger til element; vec eier det
}                              // vec destrueres → dens minne frigjøres
                               // ptr frigjøres IKKE → minnelekkasje!

int main() {
    bar(5);  // kaller bar med argument 5
    return 0;
}`,

  "custom-raii-1": `class Buffer {
    double *data;              // rå peker til heap-allokert array
public:
    Buffer(int size) {         // konstruktør: anskaffer ressurs (RAII steg 1)
        data = new double[size]; // allokerer array på heap
    }

    ~Buffer() {                // destruktør: frigjør ressurs automatisk (RAII steg 2)
        delete[] data;         // delete[] fordi data ble allokert med new[]
    }
};

void process() {
    Buffer buf(100);                        // buf på stack; 100 doubles på heap
    throw std::runtime_error("Feil!");     // unntak → stack unwinding starter
}                                          // ~Buffer() kalles → ingen lekkasje`,

  "v24v1-q7": `int a = 10;    // heltallsvariabel a med verdi 10, lagret på stack
int* b = &a;   // b er en peker; inneholder ADRESSEN til a (ikke verdien)
               // *b gir verdien på adressen (10)
               // b++ endrer ADRESSEN lagret i b (ikke verdien den peker til)
               // *(b++) – b inkrementeres, deretter leses gammel adresse`,

  "v24v1-q8": `double* p1 = new double{3.14}; // allokerer 3.14 på heap; p1 = adressen
double* p2 = p1;               // grunn kopiering: p2 = p1 = SAMME adresse
*p1 = 9.86;                    // endrer verdien begge peker på → 9.86
*p2 = 1.77;                    // endrer SAMME minnelokasjon → 1.77
                                // etter linje 4: *p1 == *p2 == 1.77`,

  "v24v2-q10": `double* euler1 = new double{0.577};   // allokerer 0.577 på heap
double* euler2 = new double{*euler1}; // *euler1 = 0.577 → ny allokering med
                                       // KOPIERT VERDI = dyp kopiering
                                       // euler1 og euler2 peker på SEPARATE objekter
*euler1 = 2.718;                       // endrer kun euler1 (euler2 upåvirket)
*euler2 = 0.596;                       // endrer kun euler2 (euler1 upåvirket)`,

  "custom-kopiering-1": `int* x = new int{42};   // allokerer int 42 på heap; x = adressen
int* y = x;             // grunn kopiering: y = x = SAMME adresse
int* z = new int{*x};   // dyp kopiering: ny int med verdi 42 → eget objekt
*x = 99;                // endrer det delte objektet → *y = 99 også
                        // z peker på eget objekt → *z er fortsatt 42`,

  "v25v2-q6": `class Member {   // standardsynlighet i class er private
    string name;                                     // privat
    string surname;                                  // privat
    int age;                                         // privat
    Member() : name{"Somebody"}, surname{"OfSomebody"}, age{100} {} // default-konstruktør
    Member(int _age, string _name, string _surname)      // parametrisert konstruktør
        : name{_name}, surname{_surname}, age{_age} {}   // initialiseringsliste
    Member(const Member &m)                              // kopikonstruktør
        : name{m.name}, surname{m.surname}, age{m.age} {} // kopierer alle felt
};`,

  "v25v1-q3": `class A {
    int* a = nullptr;        // initialisert til null for sikkerhet
public:
    A() {
        a = new int{100};    // allokerer ÉN int (ikke array) – bruk delete, ikke delete[]
    }
    A(unsigned int n) {
        a = new int{n};      // allokerer ÉN int med verdi n
    }
    ~A() {
        delete[] a;          // BUG: delete[] på enkelt-objekt → udefinert atferd!
    }                        // riktig: delete a;
};

void f() {
    A instance;                                 // instance på stack
    throw std::runtime_error("Oh noes! :(");   // unntak → ~A() kalles automatisk
}`,

  "lf-q6": `int* values = new int[3] {1, 2, 3}; // allokerer array én gang på heap
for (int i = 0; i < 3; i++) {
    delete[] values;                 // FEIL: sletter SAMME minne 3 ganger!
}                                    // → double free → udefinert atferd / krasj`,

  "lf-q7a": `#include <memory>

std::unique_ptr<Book> createBook() {
    std::unique_ptr<Book> book = new Book(); // Book allokeres på heap; book eier det
    return book;                              // eierskap flyttes ut (move semantics)
}

int func() {
    {
        auto cppBook = createBook(); // cppBook eier Book-objektet på heap
    }                                 // cppBook ut av skop → ~unique_ptr() → heap frigjøres
    return 0;
}`,

  "v25v2-q5": `int b(int n);           // fremoverdeklarasjon: kun signatur, ingen kropp
                        // kompilatoren vet nå at b() finnes

int a(int n) {          // a() defineres her; kan kalle b() pga. deklarasjonen over
    return b(n);        // kall til b med argument n
}

int b(int n) {          // b() defineres her – etter a(), men deklarert øverst
    return 42 * n;      // returnerer 42 ganger n
}`,

  "v25v2-q3": `std::random_device device;                          // ekte entropi (ikke brukt her!)
std::default_random_engine engine{0};               // PRNG seeded med FAST tall 0
                                                    // → alltid nøyaktig samme sekvens
std::uniform_int_distribution<int> diceDistribution(0, 20); // heltall 0–20

for(long long i = 0; i < 100; i++) {               // 100 iterasjoner
    std::cout << "Your roll for initiative was: "
              << diceDistribution(engine)+1 << std::endl; // 0–20 +1 = 1–21
}`,

  "lf-q2": `constexpr int increment = 1;  // kompileringstidskonstant

constexpr int incrementValue(int value) { return value + increment; }; // kan evalueres ved kompilering

constexpr void func() {
    int v1 = 10;                          // IKKE constexpr → kjøretidsverdi
    int v2 = incrementValue(v1);          // v1 er kjøretid → v2 heller ikke constexpr
    constexpr int v3 = incrementValue(1); // 1 er konstant → v3 = 2 (evaluert ved kompilering)
    constexpr int v4 = v3 + 3;            // v3 er constexpr → v4 = 5 (OK)
}`,

  "v25v2-q12": `struct B { int b; };  // B.b er IKKE initialisert → udefinert verdi

int C(int c = 5) { return c; }  // default-parameter: C() → returnerer 5

int main(int argc, char** argv) {  // argc = ant. argumenter (min. 1 = programnavnet)
    int a;                               // UINITIALISERT → udefinert verdi (UB)
    std::cout << a << std::endl;         // linje 6: udefinert oppførsel!

    B instance;                          // instance.b er UINITIALISERT → udefinert
    std::cout << instance.b << std::endl; // linje 9: udefinert oppførsel!

    int c = C();                         // C() uten arg → default 5 → c = 5
    std::cout << c << std::endl;         // linje 12: skriver alltid ut 5

    std::cout << argc << std::endl;      // linje 14: uten args → argc = 1
    return 0;
}`,
};

const modelAnswerMap: Record<string, string> = {
  "d2-ref-1":          "10",
  "d2-ptr-1":          "1",
  "d2-arv-1":          "C",
  "d2-lambda-1":       "10",
  "d2-auto-ret-1":     "double",
  "d2-constptr-1":     "Kompileringsfeil – int* kan ikke binde til const int.",
  "d2-rekursjon-1":    "24",
  "d2-vector-1":       "3",
  "d2-uptr-1":         "nullptr",
  "d2-substr-1":       '"plu"',
  "d2-template-1":     "template<typename T> void f(T x)",
  "d2-ub-arr-1":       "Udefinert atferd – rå arrays har ingen grensekontroll.",
  "d2-loop-cont-1":    "13",
  "d2-struct-def-1":   "3",
  "d2-missing-return-1": 'return "null";',
  "d2-scope-1":        "Kompileringsfeil – i er utenfor skop etter for-løkken.",
  "d2-delete-arr-1":   "delete[] arr;",
  "d2-static-var-1":   "123",
  "d2-exception-1":    "42",
  "d2-constructor-1":  "Rex",
};

export const questions: Question[] = rawQuestions.map((q) => ({
  ...q,
  hint: hintMap[q.id],
  codeAnnotated: codeAnnotatedMap[q.id],
  modelAnswer: modelAnswerMap[q.id] ?? q.modelAnswer,
}));

function pickFromGroups(pool: Question[], count: number, recentIds?: Set<string>): Question[] {
  const groupMap = new Map<string, Question[]>();
  for (const q of pool) {
    const group = groupMap.get(q.variantGroupId) ?? [];
    group.push(q);
    groupMap.set(q.variantGroupId, group);
  }
  const groups = Array.from(groupMap.values());
  const shuffledGroups = [...groups].sort(() => Math.random() - 0.5);
  const selected: Question[] = [];
  for (const group of shuffledGroups) {
    if (selected.length >= count) break;
    let pick: Question;
    if (recentIds && group.length > 1) {
      const unseen = group.filter((q) => !recentIds.has(q.id));
      pick = unseen.length > 0
        ? unseen[Math.floor(Math.random() * unseen.length)]
        : group[Math.floor(Math.random() * group.length)];
    } else {
      pick = group[Math.floor(Math.random() * group.length)];
    }
    selected.push({ ...pick, options: [...pick.options].sort(() => Math.random() - 0.5) });
  }
  return selected.slice(0, count).sort(() => Math.random() - 0.5);
}

export function getRandomQuestions(count: number, recentIds?: Set<string>): Question[] {
  return getRandomDel1Questions(count, recentIds);
}

export function getRandomDel1Questions(count: number, recentIds?: Set<string>): Question[] {
  return pickFromGroups(questions.filter((q) => q.source !== "del2" && q.source !== "K24"), count, recentIds);
}

export function getRandomDel2Questions(count: number): Question[] {
  const pool = [...questions.filter((q) => q.source === "del2" && !q.examSet)].sort(() => Math.random() - 0.5);
  return pool.slice(0, count).map((q) => ({ ...q, options: [...q.options].sort(() => Math.random() - 0.5) }));
}

export function getExamSetDel1Questions(examSet: string): Question[] {
  return questions.filter((q) => q.source === examSet && q.source !== "del2");
}

export function getExamSetDel2Questions(examSet: string): Question[] {
  return questions.filter((q) => q.source === "del2" && q.examSet === examSet);
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getAllTopics(): string[] {
  return [...new Set(questions.map((q) => q.topic))];
}

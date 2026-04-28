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
          "Feil (delvis). En ren virtuell destruktør gjør klassen abstrakt, men dette er en bieffekt av å gjøre destruktøren ren virtuell, ikke det primære formålet.",
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
        isCorrect: false,
        explanation:
          "Feil (dette er faktisk riktig!). std::unordered_set tillater ikke duplikater. Sett (set/unordered_set) lagrer unike elementer per definisjon.",
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
        text: "Når 'class A' arver fra 'class B', og 'class B' arver fra 'class C', vil 'class A' ha alle medlemsvariabelene til både 'class B' og 'class C'.",
        isCorrect: true,
        explanation:
          "Riktig. Arv er transitiv: A arver fra B som arver fra C. A inneholder alle ikke-private medlemsvariabler fra B og C.",
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
};

export const questions: Question[] = rawQuestions.map((q) => ({
  ...q,
  hint: hintMap[q.id],
}));

export function getRandomQuestions(count: number): Question[] {
  const groupMap = new Map<string, Question[]>();

  for (const q of questions) {
    const group = groupMap.get(q.variantGroupId) ?? [];
    group.push(q);
    groupMap.set(q.variantGroupId, group);
  }

  const groups = Array.from(groupMap.values());

  const shuffledGroups = [...groups].sort(() => Math.random() - 0.5);

  const selected: Question[] = [];
  for (const group of shuffledGroups) {
    if (selected.length >= count) break;
    const pick = group[Math.floor(Math.random() * group.length)];
    const shuffledOptions = [...pick.options].sort(() => Math.random() - 0.5);
    selected.push({ ...pick, options: shuffledOptions });
  }

  return selected.slice(0, count).sort(() => Math.random() - 0.5);
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getAllTopics(): string[] {
  return [...new Set(questions.map((q) => q.topic))];
}

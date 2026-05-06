export type BoardItemCategory = "suspect" | "evidence" | "location";
export type EvidenceItemCategory = "evidence" | "location";

export interface FolderInfoEntry {
  label: string;
  value: string;
}

export interface CaseFileData {
  title: string;
  tabLabel: string;
  info: FolderInfoEntry[];
  content: string[];
}

export interface EvidenceEntry {
  id: string;
  category: EvidenceItemCategory;
  label: string;
  note: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface SuspectEntry {
  id: string;
  category: "suspect";
  label: string;
  note: string;
  name: string;
  occupation: string;
  age: number;
  description: string;
  alibi: string;
  imageUrl?: string;
}

export type BoardItem = EvidenceEntry | SuspectEntry;

export interface EvidenceBoardSlot {
  id: string;
  label: string;
  hint: string;
}

export interface EvidenceBoardData {
  title: string;
  objective: string;
  prompt: string;
  slots: EvidenceBoardSlot[];
  solution: Record<string, string>;
  successMessage: string;
  items: BoardItem[];
}

export interface CaseData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  caseFile: CaseFileData;
  sidebarEvidence: EvidenceEntry;
  sidebarSuspect: SuspectEntry;
  board: EvidenceBoardData;
}

export const bellweatherCase: CaseData = {
  id: "bellweather",
  title: "Detective Web Game",
  subtitle: "Bellweather case / active file",
  description:
    "Track the people, paper, and places that do not quite line up. The board below is a first-pass deduction loop: review the case file, inspect the clues, and build a theory that breaks the false alibi.",
  caseFile: {
    title: "The Bellweather File",
    tabLabel: "Open Case",
    info: [
      { label: "Status", value: "Active surveillance" },
      { label: "Lead", value: "A. Mercer" },
      { label: "Location", value: "Pier District" },
    ],
    content: [
      "The folder opens onto a stack of notes that smell faintly of dust, nicotine, and rainwater. Bellweather was last seen leaving the precinct annex with a ledger under his arm and half a cigarette burning down to the filter.",
      "Witness statements place a dark sedan near the harbor shortly before midnight. Two dockworkers mention a woman in a camel coat, one matchbook from the Regent Club, and a lot of nervous looking over shoulders.",
      "A typed memo clipped to the back page warns that the missing ledger ties together three cold storage units, one shell company, and a payoff route that runs through city records.",
      "Recommended next step: pull transit manifests, compare handwriting samples from the annex sign-out sheet, and revisit the club before the night manager changes his story again.",
    ],
  },
  sidebarEvidence: {
    id: "sidebar-matchbook",
    category: "evidence",
    label: "Regent Matchbook",
    note: "Private room stamp ties the clue to a hidden part of the club.",
    title: "Regent Matchbook",
    description:
      "Found in Bellweather's coat pocket. The back stamp shows a reservation room not listed on the club's public floor plan.",
  },
  sidebarSuspect: {
    id: "sidebar-mercer",
    category: "suspect",
    label: "A. Mercer",
    note: "Financial crimes, city access, and a polished alibi.",
    name: "A. Mercer",
    occupation: "Former City Clerk",
    age: 45,
    alibi:
      "Claims she spent the night at home organizing campaign records for a private client.",
    description:
      "A polished operator with access to city filings, old harbor permits, and exactly the sort of shell entities that disappear cleanly on paper.",
  },
  board: {
    title: "Midnight Alibi Check",
    objective: "Prove where Mercer actually was between 10 PM and midnight.",
    prompt:
      "Pin the suspect, the physical clue, and the witness account that expose the false alibi.",
    slots: [
      {
        id: "suspect",
        label: "Person of interest",
        hint: "Choose the person whose alibi is under pressure.",
      },
      {
        id: "clue",
        label: "Physical clue",
        hint: "Pick the object that places them somewhere they deny being.",
      },
      {
        id: "witness",
        label: "Witness account",
        hint: "Select the statement that ties the suspect to the location.",
      },
    ],
    solution: {
      suspect: "mercer",
      clue: "matchbook",
      witness: "dockworkers",
    },
    successMessage:
      "The theory lands. Mercer did not spend the night at home: the club matchbook and the dockworkers' account put her near the harbor route tied to Bellweather's missing ledger.",
    items: [
      {
        id: "mercer",
        category: "suspect",
        label: "A. Mercer",
        note: "Financial crimes, city access, and a polished alibi.",
        name: "A. Mercer",
        occupation: "Former City Clerk",
        age: 45,
        alibi:
          "Claims she stayed home with campaign ledgers and did not leave the house.",
        description:
          "Connected to Bellweather through municipal records, shell filings, and two prior investigations that never quite stuck.",
      },
      {
        id: "matchbook",
        category: "evidence",
        label: "Regent Matchbook",
        note: "Private room stamp links the clue to a hidden area in the club.",
        title: "Regent Matchbook",
        description:
          "Recovered from Bellweather's coat. The reservation code on the back corresponds to an upstairs room reserved under one of Mercer's shell companies.",
      },
      {
        id: "dockworkers",
        category: "evidence",
        label: "Dockworkers' Statement",
        note: "Two witnesses mention a camel coat, club lighting, and a sedan near the pier.",
        title: "Dockworkers' Statement",
        description:
          "Two night-shift dockworkers saw a woman in a camel coat stepping out of a dark sedan near the harbor, carrying what looked like a club matchbook.",
      },
      {
        id: "ledger",
        category: "evidence",
        label: "Ledger Page",
        note: "Suggests motive, but does not answer where Mercer was that night.",
        title: "Ledger Page",
        description:
          "A torn sheet from Bellweather's accounts showing shell-company payouts and cold-storage unit numbers.",
      },
      {
        id: "regent-club",
        category: "location",
        label: "Regent Club",
        note: "An important location, but not enough on its own to crack the alibi prompt.",
        title: "Regent Club",
        description:
          "A smoke-heavy supper club with a back-room booking ledger and a habit of losing records on inconvenient nights.",
      },
    ],
  },
};

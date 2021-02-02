export interface RawAccessibility {
  id: string;
  name: string;
  pictogram: string;
}

export interface Accessibility {
  id: string;
  name: string;
  pictogramUri: string;
}

export interface AccessibilityDictionnary {
  [id: string]: Accessibility;
}

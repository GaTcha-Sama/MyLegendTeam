export const nationalityGroups = {
  "6 Nations Teams": ["France", "England", "Scotland", "Wales", "Ireland", "Italy"],
  "4 Nations Teams": ["New Zealand", "Argentina", "South Africa", "Australia"],
  "British & Irish Lions": ["England", "Wales", "Ireland", "Scotland"],
  "Pacific Cup Teams": ["Fiji", "Samoa", "Tonga", "Japan"]
} as const;

export type NationalityGroup = keyof typeof nationalityGroups;

export const isNationalityGroup = (nationality: string): nationality is NationalityGroup => {
  return nationality in nationalityGroups;
};

export const getNationalitiesInGroup = (group: NationalityGroup): readonly string[] => {
  return nationalityGroups[group];
};

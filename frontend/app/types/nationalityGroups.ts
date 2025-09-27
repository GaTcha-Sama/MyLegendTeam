export const nationalityGroupsRugby = {
  "Six Nations": ["France", "England", "Scotland", "Wales", "Ireland", "Italy"],
  "Rugby Championship": ["New Zealand", "Argentina", "South Africa", "Australia"],
  "British & Irish Lions": ["England", "Wales", "Ireland", "Scotland"],
  "Pacific Cup": ["Fiji", "Samoa", "Tonga", "Japan"]
} as const;

export type NationalityGroup = keyof typeof nationalityGroupsRugby;

export const isNationalityGroup = (nationality: string): nationality is NationalityGroup => {
  return nationality in nationalityGroupsRugby;
};

export const getNationalitiesInGroup = (group: NationalityGroup): readonly string[] => {
  return nationalityGroupsRugby[group];
};

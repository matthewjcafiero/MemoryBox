type CreatedAt = Date;
type DeletedAt = Date | null;

export type NewDataEntry = {
  message: string,
  dateObject: DateObject,
  tags: string[]
}

export type DataEntry = NewDataEntry & {
  id: string,
  createdAt: CreatedAt,
  deletedAt: DeletedAt
}

export type DataEntryWithTagObjects = DataEntry & {
  tags: TagObject[]
}

export type DataEntryEditRequest = NewDataEntry & {
  id: string
}

export type DateObject = {
  month: number,
  date: number,
  year: number
}

export type NewTagObject = {
  text: string
}

export type TagObject = NewTagObject & {
  id: string,
  createdAt: CreatedAt,
  deletedAt: DeletedAt
}
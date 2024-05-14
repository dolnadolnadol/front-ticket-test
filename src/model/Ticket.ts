export enum STATUS {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export interface ITickets {
  ticket_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: STATUS;
}
export interface IaddTickets {
  title: string;
  description?: string;
}
export interface IUpdateTicket {
  ticket_id: string;
  title?: string;
  description?: string;
  status?: STATUS;
}

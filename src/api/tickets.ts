import axios from "axios";
import { ITickets, IUpdateTicket, IaddTickets } from "../model/Ticket";

export async function getTicketsAll(): Promise<ITickets[]> {
  const result = await axios.get("http://localhost:3000/tickets");
  return result.data;
}
export async function getTicketById(id: string): Promise<ITickets> {
  const result = await axios.get("http://localhost:3000/tickets/" + id);
  return result.data;
}
export async function addTicket(data: IaddTickets): Promise<any> {
  // console.log(data, data.title, data.description);
  const result = await axios.post("http://localhost:3000/tickets", data);
  return result.data;
}
export async function updateTicket(data: IUpdateTicket): Promise<any> {
  // console.log(data, data.title, data.description);
  const result = await axios.put(
    "http://localhost:3000/tickets/" + data.ticket_id,
    data
  );
  return result.data;
}

import axios from "axios";

export async function getTicketsAll(): Promise<any> {
  const result = await axios.get("http://localhost:3000/tickets");
  return result.data;
}
export async function getTicketById(id: string): Promise<any> {
  const result = await axios.get("http://localhost:3000/tickets" + id);
  return result.data;
}

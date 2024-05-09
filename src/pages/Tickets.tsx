import { useQuery } from "@tanstack/react-query";
import { getTicketsAll } from "../api/tickets";

const Tickets = () => {
  const { isLoading, isSuccess, isError, data, refetch } = useQuery({
    queryKey: ["allTickets"],
    queryFn: getTicketsAll,
  });
  if (isError || isLoading) {
    return <div>Loading ... {isError && <a>{isError}</a>}</div>;
  }
  return (
    <>
      <div className="grid grid-cols-4 space-y-4 space-x-3">
        {data &&
          data.map((ticket: any) => (
            <div key={ticket.ticket_id} className="bg-white my-5 p-8">
              <div>{ticket.ticket_id}</div>
              <div>{ticket.title}</div>
              <div>{ticket.description}</div>
              <div>{ticket.created_at}</div>
              {/* <div>{ticket.status}</div> */}
              <select defaultValue={ticket.status}>
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          ))}
      </div>
    </>
  );
};

export default Tickets;

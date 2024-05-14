import { Badge, Button, Card, Fieldset, Grid, Group, Modal, Select, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { addTicket, getTicketById, getTicketsAll, updateTicket } from "../api/tickets";
import { ITickets, IUpdateTicket, IaddTickets, STATUS } from "../model/Ticket";
import { queryclient } from "../queryClient/queryClient";


const Tickets = () => {
  const [ButtonName, setButtonName] = useState<string>("Create Button");
  const [opened, { open, close }] = useDisclosure(false);
  const [ticketId, setTicketId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // const [create, setCreate] = useState<string>("");
  // const [update, setUpdate] = useState<string>("");
  const [status, setStatus] = useState<STATUS>(STATUS.PENDING);
  const [TicketById, setTicketById] = useState<ITickets>({
    ticket_id: "",
    title: "",
    description: "",
    created_at: "",
    updated_at: "",
    status: STATUS.PENDING
  })

  const { isLoading, isSuccess, isError, data, refetch } = useQuery({
    queryKey: ["allTickets"],
    queryFn: getTicketsAll,
  });

  const [openCreateTick, setOpenCreateTick] = useState(false);
  const handleAddtickets = () => {
    setOpenCreateTick(!openCreateTick);
    (ButtonName == "Create Button") ? setButtonName("Close") : setButtonName("Create Button");
  };

  const addMutation = useMutation({
    mutationKey: ["addTicket"],
    mutationFn: addTicket,
  });

  const handleSubmitCreate = async () => {
    const ticketData: IaddTickets = {
      title: title,
      description: description,
    };
    // console.log(ticketData)
    await addMutation.mutateAsync(ticketData);
    queryclient.invalidateQueries({
      queryKey: ["addTicket"],
    });
    close()
    refetch()
  };

  const getByIdMutation = useMutation({
    mutationKey: ["getTicketById"],
    mutationFn: getTicketById,
  });
  const handleEditTicket = async (id: string) => {
    open()
    const ticketbyId = await getByIdMutation.mutateAsync(id);
    queryclient.invalidateQueries({
      queryKey: ["getTicketById"]
    })
    setTicketById(ticketbyId)
    setTicketId(ticketbyId.ticket_id)
    setTitle(ticketbyId.title)
    setDescription(ticketbyId.description)
    // setCreate(ticketbyId.created_at)
    // setUpdate(ticketbyId.updated_at)
    setStatus(ticketbyId.status)
  }

  const updateMutation = useMutation({
    mutationKey: ["updateTicket"],
    mutationFn: updateTicket,
  });

  const handleSaveEditTicket = async (id: string) => {
    const body: IUpdateTicket = {
      ticket_id: id,
      title: title,
      description: description
    }
    await updateMutation.mutateAsync(body);
    queryclient.invalidateQueries({
      queryKey: ["updateTicket"]
    })
    close()
    refetch()
  }

  if (isError || isLoading) {
    return (
      <div className="text-center my-8">
        Loading ... {isError && <div className="text-red-500">{isError}</div>}
      </div>
    );
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="update" centered>
        <TextInput label="ticket_id" defaultValue={ticketId} disabled></TextInput>
        <TextInput label="title" defaultValue={TicketById.title} onChange={(e) => setTitle(e.target.value)}></TextInput>
        <TextInput label="description" defaultValue={TicketById.description} onChange={(e) => setDescription(e.target.value)}></TextInput>
        <TextInput label="create_time" defaultValue={moment(TicketById.created_at).format("YYYY-MM-DD HH:mm:ss")} disabled></TextInput>
        <TextInput label="update_time" defaultValue={moment(TicketById.updated_at).format("YYYY-MM-DD HH:mm:ss")} disabled></TextInput>
        <Select
          label="Status"
          defaultValue={status}
          data={['PENDING', 'INPROGRESS', 'COMPLETED', 'CANCELLED']} />
        <Group mt={10}>
          <Button color="red" onClick={close}>Cancel</Button>
          <Button onClick={() => handleSaveEditTicket(ticketId)}>Update Changes</Button>
        </Group>
      </Modal>
      <Title>Tickets</Title>
      <Button
        mt={20}
        onClick={handleAddtickets}
      >
        {ButtonName}
      </Button>
      {openCreateTick && (
        <Fieldset style={{ marginTop: "2rem" }} legend="Create Ticket">
          <TextInput required label="Title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <TextInput label="Description" placeholder="Description" onChange={(e) => setDescription(e.target.value)} mt="md" />
          <Button onClick={handleSubmitCreate}>Submit</Button>
        </Fieldset>
      )}
      <Grid p={50}>
        {data &&
          isSuccess &&
          data.map((ticket: ITickets) => (
            <Grid.Col span={{ lg: 3, md: 6 }} key={ticket.ticket_id}>
              <Card shadow="sm" padding="lg" radius="md"
                withBorder
                key={ticket.ticket_id}
              >
                <Group>
                  <Text>ID:
                    {ticket.ticket_id}</Text>
                </Group>


                <Group>
                  <Text size="xl"
                    fw={900}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan', deg: 90 }} >{ticket.title}</Text>
                </Group>

                <Group>
                  <Text fs="italic">
                    {ticket.description}</Text>
                </Group>

                <Group>
                  <Text>{moment(ticket.created_at).format("YYYY-MM-DD HH:mm:ss")}</Text>
                </Group>

                {/* <Group> */}
                <Group mb={10}>
                  <Badge>{ticket.status}</Badge>
                  {/* <select
                    disabled
                    defaultValue={ticket.status}
                    className="ml-2 px-2 py-1 border rounded-md text-sm"
                  >
                    <option value="PENDING" hidden>PENDING</option>
                    <option value="IN_PROGRESS" hidden>IN_PROGRESS</option>
                    <option value="COMPLETED" hidden>COMPLETED</option>
                    <option value="CANCELLED" hidden>CANCELLED</option>

                    {ticket.status == STATUS.PENDING && (
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                    )}
                    {ticket.status == STATUS.IN_PROGRESS && (
                      <option value="COMPLETED">COMPLETED</option>
                    )}
                    {ticket.status == STATUS.IN_PROGRESS && (
                      <option value="CANCELLED">CANCELLED</option>
                    )}
                  </select> */}
                </Group>
                {/* </Group> */}
                <Button variant="light" onClick={() => handleEditTicket(ticket.ticket_id)}>edit</Button>
              </Card>
            </Grid.Col>
          ))}
      </Grid >
      <Outlet />
    </>
  );
};

export default Tickets;


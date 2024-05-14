import { Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


export const AboutPage = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal onClose={close} opened={opened}>
                <Title>
                    Hello world
                </Title>
            </Modal>
        </>
    );
};

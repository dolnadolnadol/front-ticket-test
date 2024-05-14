import {
    AppShell,
    useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
interface ContentProps {
    children: JSX.Element;
}
export default function Layout(body: ContentProps) {
    const theme = useMantineTheme();
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            // header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >

            <AppShell.Navbar p="md">
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/about"}>About</Link>
                    </li>
                    <li>
                        <Link to={"/thorn"}>Thron</Link>
                    </li>
                    <li>
                        <Link to={"/tickets"}>Tickets</Link>
                    </li>
                </ul>
            </AppShell.Navbar>

            <AppShell.Main>{body.children}</AppShell.Main>
        </AppShell>
    );
}
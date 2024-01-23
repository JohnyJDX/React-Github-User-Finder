import { Container, Flex, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';
import NavBar from './components/NavBar';
import Search from './components/Search';
import UserProfile from './components/UserProfile';

function App() {
	const [userData, setUserData] = useState();
	const [isLoading, setIsLoading] = useState(false);

	return (
		<Container maxW="container.lg">
			<NavBar />
			<Text fontSize="xx-large" textAlign="center" my={4}>
				Search users on GitHub
			</Text>
			<Search setUserData={setUserData} setIsLoading={setIsLoading} />
			{userData && <UserProfile userData={userData} />}
			{isLoading && (
				<Flex justifyContent={'center'}>
					<Spinner my={10} size={'xl'} />
				</Flex>
			)}
		</Container>
	);
}

export default App;

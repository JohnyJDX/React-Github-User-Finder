import { Button, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const Search = ({ setUserData, setIsLoading }) => {
	const [query, setQuery] = useState('');
	const toast = useToast();

	const handleSubmit = async e => {
		e.preventDefault();

		if (!query) return;

		setIsLoading(true);

		try {
			const res = await fetch(`https://api.github.com/users/${query}`);
			const data = await res.json();
			if (data.message) {
				toast({
					title: 'Error',
					description:
						data.message === 'Not Found' ? 'User not found' : data.message,
					status: 'error',
					duration: 3000,
					isClosable: true,
					position: 'top',
				});
			}
			setUserData(data);
			addUserToLocalStorage(data, query);
		} catch (error) {
			toast({
				title: 'Error',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const addUserToLocalStorage = (data, username) => {
		const users = JSON.parse(localStorage.getItem('github-users')) || [];
		const userExists = users.find(user => user.id === username);

		if (userExists) {
			users.splice(users.indexOf(userExists), 1);
		}
		users.unshift({
			id: username,
			avatar_url: data.avatar_url,
			name: data.name,
			url: data.html_url,
		});

		localStorage.setItem('github-users', JSON.stringify(users));
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				onChange={e => setQuery(e.target.value)}
				type="text"
				variant="outline"
				my="4"
				placeholder="Type a user name"
				focusBorderColor="yellow.500"
				value={query}
			/>
			<Button
				size="md"
				type="submit"
				colorScheme="yellow"
				isDisabled={!query}
				opacity={!query ? 0.5 : 1}
			>
				Search
			</Button>
		</form>
	);
};

export default Search;

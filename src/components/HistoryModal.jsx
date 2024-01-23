import { DeleteIcon } from '@chakra-ui/icons';
import {
	Avatar,
	Box,
	Button,
	Flex,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const HistoryModal = ({ isOpen, onClose }) => {
	const [searchUsers, setSearchUsers] = useState([]);
	const toast = useToast();

	useEffect(() => {
		const users = JSON.parse(localStorage.getItem('github-users' || []));
		setSearchUsers(users);
	}, []);

	const handleDeleteUser = userId => {
		const updatedUsers = searchUsers.filter(user => user.id !== userId);

		localStorage.setItem('github-users', JSON.stringify(updatedUsers));
		setSearchUsers(updatedUsers);
		toast({
			title: 'Success',
			description: 'User deleted successfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg={'gray.900'}>
				<ModalHeader>Search History</ModalHeader>
				<ModalBody>
					<Text>Users you searched for:</Text>
					<VStack gap={4} maxHeight={300} overflow={'auto'} my={4}>
						{!searchUsers?.length && (
							<Text color={'gray.400'} fontSize={'sm'} fontWeight={'bold'}>
								No Users searched yet
							</Text>
						)}
						{searchUsers.map(user => (
							<Flex
								key={user.id}
								alignItems={'center'}
								bg={'whiteAlpha.200'}
								w={'full'}
								_hover={{ bg: 'whiteAlpha.400' }}
								p={4}
								cursor={'pointer'}
								borderRadius={4}
								justifyContent={'space-between'}
							>
								<Flex alignItems={'center'} gap={4}>
									<Avatar
										name={user.name}
										src={user.avatar_url}
										size={{ base: 'sm', sm: 'lg' }}
									/>
									<Box>
										<Text fontWeight={'bold'}>{user.name || 'User'}</Text>
										<Text fontSize={'sm'} color={'gray.400'}>
											{user.id || 'User'}
										</Text>
									</Box>
								</Flex>
								<Flex gap={3}>
									<Button colorScheme="green" size="sm" color={'black'}>
										<Link href={user.url}>Visit</Link>
									</Button>
									<Button
										_hover={{ bg: 'transparent' }}
										variant="outline"
										size={'sm'}
										colorScheme="red"
									>
										<DeleteIcon
											color="red.500"
											onClick={() => handleDeleteUser(user.id)}
										/>
									</Button>
								</Flex>
							</Flex>
						))}
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default HistoryModal;

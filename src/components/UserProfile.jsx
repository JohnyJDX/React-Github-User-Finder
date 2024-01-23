import {
	Avatar,
	Badge,
	Box,
	Button,
	Flex,
	Link,
	Text,
	VStack,
} from '@chakra-ui/react';
import Repos from './Repos';

const UserProfile = ({ userData }) => {
	return (
		<>
			<Flex
				my={16}
				border={'2px solid'}
				borderColor={'yellow.500'}
				padding={8}
				gap={5}
				direction={{ base: 'column', sm: 'row' }}
			>
				<VStack gap={5}>
					<Avatar name={userData.name} src={userData.avatar_url} size="2xl" />
					<Button colorScheme="yellow">
						<Link href={userData.html_url} isExternal>
							View Profile
						</Link>
					</Button>
				</VStack>
				<VStack ml={{ base: 0, sm: 9 }} alignItems={'flex-start'}>
					<Flex gap={5} wrap={'wrap'}>
						<Badge fontSize="0.9em" colorScheme="yellow">
							PUBLIC REPOS: {userData.public_repos}
						</Badge>
						<Badge fontSize="0.9em" colorScheme="red">
							PUBLIC GISTS: {userData.public_gists}
						</Badge>
						<Badge fontSize="0.9em" colorScheme="green">
							FOLLOWERS: {userData.followers}
						</Badge>
						<Badge fontSize="0.9em" colorScheme="purple">
							FOLLOWING: {userData.following}
						</Badge>
					</Flex>
					<Text fontSize={'2xl'} fontWeight={'bold'} color={'yellow.400'}>
						{userData.name}
					</Text>
					<Text fontSize={'xl'} fontWeight={'bold'} color={'yellow.500'}>
						{userData.bio}
					</Text>
					<Box>
						<Text fontSize={'md'}>
							<Text as={'span'} fontWeight={'bold'} color={'yellow.300'}>
								Company:{' '}
							</Text>
							{userData.company || 'Not Specified'}
						</Text>
						<Text fontSize={'md'}>
							<Text as={'span'} fontWeight={'bold'} color={'yellow.300'}>
								Location:{' '}
							</Text>
							{userData.location || 'Not Specified'}
						</Text>
						<Text fontSize={'md'}>
							<Text as={'span'} fontWeight={'bold'} color={'yellow.300'}>
								Blog / Website:{' '}
							</Text>
							{userData.blog ? (
								<Link href={userData.blog} isExternal>
									{userData.blog}
								</Link>
							) : (
								'Not Specified'
							)}
						</Text>
						<Text fontSize={'md'}>
							<Text as={'span'} fontWeight={'bold'} color={'yellow.300'}>
								Member Since:{' '}
							</Text>
							{new Date(userData.created_at).toLocaleDateString() ||
								'Not Specified'}
						</Text>
					</Box>
				</VStack>
			</Flex>
			<Repos reposUrl={userData.repos_url} />
		</>
	);
};

export default UserProfile;

import {
	Badge,
	Button,
	Flex,
	Link,
	Spinner,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Repos = ({ reposUrl }) => {
	const [repos, setRepos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const toast = useToast();

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(reposUrl);
				const data = await res.json();
				if (data.message) throw new Error(data.message);
				setRepos(data);
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
		fetchRepos();
	}, [reposUrl, toast]);

	return (
		<>
			<Text
				color={'yellow.400'}
				fontSize={'3xl'}
				letterSpacing={1.5}
				textAlign={'center'}
				fontWeight={'bold'}
			>
				REPOSITORIES
			</Text>
			{isLoading && (
				<Flex justifyContent={'center'}>
					<Spinner my={10} size={'xl'} />
				</Flex>
			)}
			{repos
				.sort((a, b) => b.stargazers_count - a.stargazers_count)
				.map((repo, i) => {
					if (i > 4 && !showMore) return null;

					return (
						<Flex
							key={repo.id}
							padding={4}
							bg={'whiteAlpha.200'}
							_hover={{ bg: 'whiteAlpha.400' }}
							my={4}
							px={10}
							gap={5}
							borderRadius={4}
							transition={'all 0.3s ease-out'}
							justifyContent={'space-between'}
							alignItems={'center'}
							direction={{ base: 'column', sm: 'row' }}
						>
							<Flex flex={1} direction={'column'} gap={3}>
								<Link
									href={repo.html_url}
									fontSize={'md'}
									fontWeight={'bold'}
									isExternal
								>
									{repo.name}
								</Link>
								<Badge
									fontSize={'0.7em'}
									colorScheme="yellow"
									w={'min-content'}
									px={1}
								>
									LANGUAGE: {repo.language || 'None'}
								</Badge>
							</Flex>
							<Flex flex={1} gap={4}>
								<Badge
									flex={1}
									fontSize={{ base: '0.7em', md: '0.9em' }}
									textAlign={'center'}
									colorScheme={'yellow'}
								>
									STARS: {repo.stargazers_count}
								</Badge>
								<Badge
									flex={1}
									fontSize={{ base: '0.7em', md: '0.9em' }}
									textAlign={'center'}
									colorScheme={'red'}
								>
									FORKS: {repo.forks}
								</Badge>
								<Badge
									flex={1}
									fontSize={{ base: '0.7em', md: '0.9em' }}
									textAlign={'center'}
									colorScheme={'teal'}
								>
									WATCHERS: {repo.watchers}
								</Badge>
							</Flex>
						</Flex>
					);
				})}
			{showMore && (
				<Flex justifyContent={'center'} m={6}>
					<Button
						onClick={() => setShowMore(false)}
						size={'md'}
						colorScheme="yellow"
					>
						Show less
					</Button>
				</Flex>
			)}
			{!showMore && repos.length > 5 && (
				<Flex justifyContent={'center'} m={6}>
					<Button
						onClick={() => setShowMore(true)}
						size={'md'}
						colorScheme="yellow"
					>
						Show more
					</Button>
				</Flex>
			)}
		</>
	);
};

export default Repos;
//

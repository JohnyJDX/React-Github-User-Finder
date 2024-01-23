import { Box, Button, Flex, Image, useDisclosure } from '@chakra-ui/react';
import HistoryModal from './HistoryModal';

const NavBar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex alignItems="center" justifyContent="space-between" py={6}>
			<Box maxW="80px">
				<Image src="/logo.png" alt="github logo" />
			</Box>
			<Box my={4}>
				<Button size="md" colorScheme="yellow" onClick={onOpen}>
					Search History
				</Button>
			</Box>
			{isOpen && <HistoryModal onClose={onClose} isOpen={isOpen} />}
		</Flex>
	);
};

export default NavBar;

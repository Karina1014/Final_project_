const deleteDog = async (req, res) => {
    const { id } = req.params; // Aquí debe venir el id

    try {
        const result = await dogModel.deleteDog(id);

        if (!result) {
            return res.status(404).json({ message: 'Dog not found' });
        }

        return res.status(200).json({ message: 'Dog deleted successfully', id: result.id });
    } catch (error) {
        console.error('Error deleting dog:', error);
        return res.status(500).json({ message: 'Error deleting dog' });
    }
};

export { deleteDog };

export default function handler(req, res) {
    res.status(200).json([
        { id: 1, title: 'First Post', content: 'This is the first post' },
        { id: 2, title: 'Second Post', content: 'This is the second post' }
    ]);
}

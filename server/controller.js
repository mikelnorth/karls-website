module.exports = {
    getLinks: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { category } = req.params;

        dbInstance.get_links_category([category])
            .then((links) => {
                return res.status(200).send(links)
            })
            .catch((err) => res.status(500).send(err))

    }
}
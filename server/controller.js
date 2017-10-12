module.exports = {
    getLinks: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { category } = req.params;

        dbInstance.get_links_category([category])
            .then((links) => {
                return res.status(200).send(links)
            })
            .catch((err) => res.status(500).send(err))

    },

    updateVideo: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { title, embedded_link, category} = req.body;
        const { id } = req.params

        dbInstance.update_video([title, embedded_link, category, id])
        .then((newVideo) => {
            dbInstance.get_links_category([category])
            .then((links) => {
                return res.status(200).send(links)
            })
            .catch((err) => res.status(500).send(err))
        })
        .catch((err) => res.status(500).send(err))
    }
}
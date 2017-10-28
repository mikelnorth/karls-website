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

    getFeatured: (req, res, next) => {
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
        const { title, embedded_link, category } = req.body;
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
    },

    insertCustomer: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { first_name, last_name, email, phone, contact_method } = req.body;

        dbInstance.insert_customer([first_name, last_name, email, phone, contact_method, false])
            .then((newCustomer) => {
                req.app.get('db').get_customer_id()
                    .then(customerId => {

                        res.status(200).send(customerId[0])
                    })
            })
            .catch((err) => res.status(500).send(err))
    },

    insertWedding: (req, res, next) => {

        const dbInstance = req.app.get('db');
        const { wedding_location, wedding_date, reception_location, reception_date, bridal_location, bridal_date, wedding_type,
            indoor, audio, message, customer_id } = req.body;


        dbInstance.insert_wedding([wedding_location, wedding_date, reception_location, reception_date, bridal_location, bridal_date,
            wedding_type, indoor, audio, message, customer_id])
            .then(() => {
                res.status(200).send()

            })
            .catch((err) => res.status(500).send(err))
    },

    getCustomers: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_all_customers()
            .then(customers => {
                res.status(200).send(customers)
            })
    },

    updateCustomer: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { archive, id } = req.body;

        dbInstance.update_customer([archive, id])
            .then((newCustomers) => {
                dbInstance.get_all_customers()
                    .then(customers => {
                        res.status(200).send(customers)
                    })
            })
            .catch((err) => res.status(500).send(err))
    }


}
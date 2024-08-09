const product = (req, res) => {
    try {
        res.render('admin/Products', { title: 'Products' })
    }
    catch (err) {
        console.log(`Error rendering products page ${err}`)
    }
}

module.exports = {
    product
}
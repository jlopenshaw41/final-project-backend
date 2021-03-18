export function showForm(req, res) {
  res.render('index', {
    errors: req.flash('errors'),
    successes: req.flash('successes'),
  });
}

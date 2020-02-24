User.create(
  email: "guido@test.com",
  password: "password"
)

Trip.create(
  title: 'A trip to Italy',
  user: User.first,
  start_date: Date.today + 10,
  end_date: Date.today + 18,
  country: 'Italy',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
)

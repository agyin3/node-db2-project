
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: '1234MJSKT6789PLKN', make: 'Honda', model: 'Civic', mileage: 15000},
        {VIN: '1234MJJFSDNA4954N', make: 'Audi', model: 'R8', mileage: 300},
        {VIN: '3290DFJKSLANJK343', make: 'Tesla', model: 'S3', mileage: 7430},
        {VIN: 'KFDS3I4MKLJ23920N', make: 'BMW', model: 'i8', mileage: 23000},
        {VIN: '13094320JRKLADNJD', make: 'Lamborghini', model: 'Aventador', mileage: 350}
      ]);
    });
};

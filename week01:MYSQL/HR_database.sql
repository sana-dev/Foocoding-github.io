create database HR;
use HR;

create table employee (
id INT not null auto_increment,
employee_name varchar(50) not null,
primary key (id)
); 

create table locations(
id INT not null auto_increment,
employee_adress varchar(500),
employee_id INT not null,
primary key (id),
foreign key (employee_id) references employee(id)
);
alter table locations 
add profession varchar(100);

INSERT INTO  employee (employee_name)
values
('John Doe'),
('Jane Smith'),
('Michael Brown'),
('Emily Davis'),
('Daniel Wilson'),
('Laura Johnson'),
('Robert Miller'),
('Susan Moore'),
('James Taylor'),
('Patricia Anderson'),
('Linda Thomas'),
('Charles Jackson'),
('Barbara White'),
('Paul Harris'),
('Nancy Martin'),
('Kevin Garcia'),
('Sandra Martinez'),
('George Robinson'),
('Betty Clark'),
('Helen Rodriguez');
insert into locations (employee_adress ,employee_id ,profession ) 
 VALUES ('123 Main St', 1, 'Engineer'),
 ('456 Oak Ave', 2, 'Doctor'),
('789 Pine Rd', 3, 'Teacher'),
 ('101 Maple St', 4, 'Nurse'),
 ('202 Birch Ln', 5, 'Lawyer'),
('303 Cedar Blvd', 6, 'Architect'),
('404 Elm St', 7, 'Scientist'),
 ('505 Spruce Ct', 8, 'Accountant'),
('606 Fir St', 9, 'Designer'),
('707 Willow Ave', 10, 'Chef'),
('808 Aspen Rd', 11, 'Journalist'),
 ('909 Poplar Ln', 12, 'Pharmacist'),
 ('111 Sycamore St', 13, 'Dentist'),
('222 Redwood Blvd', 14, 'Mechanic'),
 ('333 Chestnut Ct', 15, 'Electrician'),
 ('444 Walnut St', 16, 'Plumber'),
 ('555 Hickory Ave', 17, 'Pilot'),
('666 Magnolia Rd', 18, 'Artist'),
('777 Dogwood Ln', 19, 'Engineer'),
('888 Sequoia St', 20, 'Therapist');

select * from locations;
-- select distinct id from locations;
select * from employee
join locations on employee.id =locations.employee_id; 

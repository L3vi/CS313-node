CREATE DATABASE familyhistory;

CREATE TABLE persons (
	id SERIAL PRIMARY KEY,
	firstname VARCHAR(30),
	lastname VARCHAR(30),
	dateOfBirth DATE
);

CREATE TABLE relationships (
	id SERIAL PRIMARY KEY,
	parent_id INT REFERENCES persons(id),
	child_id INT REFERENCES persons(id),
	relationship VARCHAR(30)
);

CREATE USER familyhistoryuser WITH PASSWORD 'elijah';
GRANT SELECT, INSERT, UPDATE ON persons TO familyhistoryuser;
GRANT SELECT, INSERT, UPDATE ON relationships TO familyhistoryuser;
GRANT USAGE, SELECT ON SEQUENCE persons_id_seq TO familyhistoryuser;
GRANT USAGE, SELECT ON SEQUENCE relationships_id_seq TO familyhistoryuser;

INSERT INTO persons (firstname, lastname, dateOfBirth) VALUES ('Levi', 'Stum', '1995-01-04');
INSERT INTO persons (firstname, lastname, dateOfBirth) VALUES ('Alex', 'Stum', '1978-08-08');
INSERT INTO persons (firstname, lastname, dateOfBirth) VALUES ('Richard', 'Stum', '1954-03-04');
INSERT INTO persons (firstname, lastname, dateOfBirth) VALUES ('Eva', 'Stum', '2008-04-01');

INSERT INTO relationships (parent_id, child_id, relationship) VALUES (3, 1, 'parent-child');
INSERT INTO relationships (parent_id, child_id, relationship) VALUES (2, 4, 'parent-child');
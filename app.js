const pool = require('./db');
const readline = require('readline');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 8000;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like your HTML)
app.use(express.static(path.join(__dirname, 'public')));


app.post('/run-query', async (req, res) => {
    const client = await pool.connect();
   
    try {
      const { query } = req.body;
  
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is missing.' });
      }
  
      const result = await client.query(query);
  
      // Check if the result is empty
      if (result.rows.length === 0) {
        res.json({ message: 'No results found' });
      } else {
        res.json(result.rows);
      }
    } catch (error) {
      console.error('Error running query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      client.release();
    }
  });



//insert queries
async function runQueries() {
    try {
      await pool.connect();
  
      // Query 1
      const query1 = `
      CREATE TABLE manufacturer (
        Manufacturer_ID INT PRIMARY KEY,
        Name VARCHAR(255),
        Country VARCHAR(255),
        State VARCHAR(255),
        City VARCHAR(255),
        Street VARCHAR(255),
        Pincode VARCHAR(10),
        Contact_No VARCHAR(255)
    );

      `;
  
      const result1 = await pool.query(query1);
      console.log('Query 1 Result:', result1);
  
      // Query 2
      const query2 = `
      INSERT INTO manufacturer (Manufacturer_ID, Name, Country, State, City, Street, Pincode, Contact_No)
      VALUES
      (1, 'ABC Motors', 'USA', 'California', 'Los Angeles', '123 Main St', '90001', '+1 123-456-7890'),
      (2, 'XYZ Cars', 'UK', 'England', 'London', '456 Oak St', 'SW1A 1AA', '+44 20 1234 5678'),
      (3, 'PQR Vehicles', 'Canada', 'Ontario', 'Toronto', '789 Maple St', 'M5H 2N2', '+1 416-555-1234'),
      (4, 'LMN Auto', 'Germany', 'Bavaria', 'Munich', '101 Pine St', '80331', '+49 89 12345678'),
      (5, 'RST Motors', 'Australia', 'New South Wales', 'Sydney', '202 Cedar St', '2000', '+61 2 9876 5432'),
      (6, 'EFG Cars', 'France', 'Ile-de-France', 'Paris', '303 Spruce St', '75001', '+33 1 23 45 67 89'),
      (7, 'HIJ Autos', 'Japan', 'Tokyo', 'Tokyo', '404 Birch St', '100-0005', '+81 3-1234-5678'),
      (8, 'MNO Vehicles', 'Brazil', 'Sao Paulo', 'Sao Paulo', '505 Fir St', '01310-100', '+55 11 98765-4321'),
      (9, 'UVW Motors', 'India', 'Maharashtra', 'Mumbai', '606 Ash St', '400001', '+91 22 8765 4321'),
      (10, 'JKL Cars', 'South Korea', 'Seoul', 'Seoul', '707 Elm St', '04521', '+82 2-3456-7890');
      `;
  
      const result2 = await pool.query(query2);
      console.log('Query 2 Result:', result2);
  
      // Query 3
      const query3 = `
      CREATE TABLE manufacturing_details (
        VIN VARCHAR(17) PRIMARY KEY,
        Mfg_Date DATE,
        Brand VARCHAR(255),
        Model VARCHAR(255),
        Manufacturer_ID INT,
        FOREIGN KEY (Manufacturer_ID) REFERENCES Manufacturer(Manufacturer_ID)
    );
      `;
  
      const result3 = await pool.query(query3);
      console.log('Query 3 Result:', result3);
  
      // Query 4
      const query4 = `
      INSERT INTO manufacturing_details (VIN, Mfg_Date, Brand, Model, Manufacturer_ID)
      VALUES
      ('VIN1', '2022-01-15', 'Brand1', 'ModelA', 1),
      ('VIN2', '2022-02-20', 'Brand2', 'ModelB', 2),
      ('VIN3', '2022-03-25', 'Brand3', 'ModelC', 3),
      ('VIN4', '2022-04-30', 'Brand4', 'ModelD', 4),
      ('VIN5', '2022-05-05', 'Brand5', 'ModelE', 5),
      ('VIN6', '2022-06-10', 'Brand6', 'ModelF', 6),
      ('VIN7', '2022-07-15', 'Brand7', 'ModelG', 7),
      ('VIN8', '2022-08-20', 'Brand8', 'ModelH', 8),
      ('VIN9', '2022-09-25', 'Brand9', 'ModelI', 9),
      ('VIN10', '2022-10-30', 'Brand10', 'ModelJ', 10);
      `;
  
      const result4 = await pool.query(query4);
      console.log('Query 4 Result:', result4);
  
      // Query 5
      const query5 = `
      CREATE TABLE dealer (
        
        Dealer_Name VARCHAR(255),
        Branch VARCHAR(255),
        Country VARCHAR(255),
        State VARCHAR(255),
        City VARCHAR(255),
        Street VARCHAR(255),
        Pincode VARCHAR(10),
        Contact_No VARCHAR(15),
        PRIMARY KEY (Dealer_Name, Branch)
    );
      `;
  
      const result5 = await pool.query(query5);
      console.log('Query 5 Result:', result5);
  
      // Query 6
      const query6 = `
      INSERT INTO dealer (Dealer_Name, Branch, Country, State, City, Street, Pincode, Contact_No)
      VALUES
      ('Dealer1', 'BranchA', 'Country1', 'State1', 'City1', 'Street1', '12345', '+1234567890'),
      ('Dealer2', 'BranchB', 'Country2', 'State2', 'City2', 'Street2', '23456', '+2345678901'),
      ('Dealer3', 'BranchC', 'Country3', 'State3', 'City3', 'Street3', '34567', '+3456789012'),
      ('Dealer4', 'BranchD', 'Country4', 'State4', 'City4', 'Street4', '45678', '+4567890123'),
      ('Dealer5', 'BranchE', 'Country5', 'State5', 'City5', 'Street5', '56789', '+5678901234'),
      ('Dealer6', 'BranchF', 'Country6', 'State6', 'City6', 'Street6', '67890', '+6789012345'),
      ('Dealer7', 'BranchG', 'Country7', 'State7', 'City7', 'Street7', '78901', '+7890123456'),
      ('Dealer8', 'BranchH', 'Country8', 'State8', 'City8', 'Street8', '89012', '+8901234567'),
      ('Dealer9', 'BranchI', 'Country9', 'State9', 'City9', 'Street9', '90123', '+9012345678'),
      ('Dealer10', 'BranchJ', 'Country10', 'State10', 'City10', 'Street10', '01234', '+0123456789');
      `;

    
  
      const result6 = await pool.query(query6);
      console.log('Query 6 Result:', result6);


      const query8=`
      CREATE TABLE inventory (
        VIN VARCHAR(17) PRIMARY KEY,
        Dealer_Name VARCHAR(255),
        Branch VARCHAR(255),
        Status VARCHAR(50),
        FOREIGN KEY (Dealer_Name, Branch) REFERENCES dealer(Dealer_Name, Branch)
    );
      `;

      const result8 = await pool.query(query8);
      console.log('Query 8 Result:', result8);

      const query7=`
      INSERT INTO inventory (VIN, Dealer_Name, Branch, Status)
      VALUES
      ('VIN1', 'Dealer1', 'BranchA', 'Available'),
      ('VIN2', 'Dealer2', 'BranchB', 'Sold'),
      ('VIN3', 'Dealer3', 'BranchC', 'Available'),
      ('VIN4', 'Dealer4', 'BranchD', 'Sold'),
      ('VIN5', 'Dealer5', 'BranchE', 'Available'),
      ('VIN6', 'Dealer6', 'BranchF', 'Available'),
      ('VIN7', 'Dealer7', 'BranchG', 'Sold'),
      ('VIN8', 'Dealer8', 'BranchH', 'Available'),
      ('VIN9', 'Dealer9', 'BranchI', 'Sold'),
      ('VIN10', 'Dealer10', 'BranchJ', 'Available');
      `;

      const result7 = await pool.query(query7);
      console.log('Query 7 Result:', result7);

      const query9=`
      CREATE TABLE car_specs (
        VIN VARCHAR(17) PRIMARY KEY,
        Brand VARCHAR(255),
        Model VARCHAR(255),
        Engine VARCHAR(255),
        Transmission VARCHAR(255),
        Emissions_Std VARCHAR(50),
        Body_Type VARCHAR(50),
        Color VARCHAR(50),
        Price DECIMAL(10, 2)
    );
      `;

      const result9 = await pool.query(query9);
      console.log('Query 9 Result:', result9);

      

        const query10=`
        INSERT INTO car_specs (VIN, Brand, Model, Engine, Transmission, Emissions_Std, Body_Type, Color, Price)
        VALUES
        ('VIN1', 'Brand1', 'Model1', 'Engine1', 'Automatic', 'Emission1', 'Sedan', 'Red', 25000.00),
        ('VIN2', 'Brand2', 'Model2', 'Engine2', 'Manual', 'Emission2', 'SUV', 'Blue', 28000.00),
        ('VIN3', 'Brand3', 'Model3', 'Engine3', 'Automatic', 'Emission3', 'Coupe', 'Green', 30000.00),
        ('VIN4', 'Brand4', 'Model4', 'Engine4', 'Manual', 'Emission4', 'Sedan', 'Black', 27000.00),
        ('VIN5', 'Brand5', 'Model5', 'Engine5', 'Automatic', 'Emission5', 'SUV', 'Silver', 32000.00),
        ('VIN6', 'Brand6', 'Model6', 'Engine6', 'Manual', 'Emission6', 'Coupe', 'White', 26000.00),
        ('VIN7', 'Brand7', 'Model7', 'Engine7', 'Automatic', 'Emission7', 'Sedan', 'Yellow', 31000.00),
        ('VIN8', 'Brand8', 'Model8', 'Engine8', 'Manual', 'Emission8', 'SUV', 'Orange', 29000.00),
        ('VIN9', 'Brand9', 'Model9', 'Engine9', 'Automatic', 'Emission9', 'Coupe', 'Purple', 27000.00),
        ('VIN10', 'Brand10', 'Model10', 'Engine10', 'Automatic', 'Emission10', 'Sedan', 'Gray', 33000.00);
        `;

        const result10 = await pool.query(query10);
        console.log('Query 10 Result:', result10);

       

        const query13 = `
        CREATE TABLE customer (
          Customer_ID INT PRIMARY KEY,
          Name VARCHAR(255),
          Gender CHAR(1),
          Country VARCHAR(255),
          State VARCHAR(255),
          City VARCHAR(255),
          Street VARCHAR(255),
          Pincode VARCHAR(10),
          Contact VARCHAR(15),
          Income DECIMAL(15, 2),
          Type VARCHAR(255)
      );
        `;

        const result13 = await pool.query(query13);
        console.log('Query 13 Result:', result13);

        const query14 = `
        INSERT INTO customer (Customer_ID, Name, Gender, Country, State, City, Street, Pincode, Contact, Income, Type)
        VALUES
        (101, 'Alice Johnson', 'F', 'USA', 'NY', 'New York City', '123 Main St', '10001', '+1 456-7890', 60000.00, 'Regular'),
        (102, 'Bob Smith', 'M', 'USA', 'CA', 'Los Angeles', '456 Elm St', '90001', '+1 567-8901', 75000.00, 'Regular'),
        (103, 'Eva Davis', 'F', 'USA', 'IL', 'Chicago', '789 Oak St', '60601', '+1 678-9012', 90000.00, 'Regular'),
        (104, 'David Brown', 'M', 'USA', 'TX', 'Houston', '101 Pine St', '77001', '+1 789-0123', 80000.00, 'Regular'),
        (105, 'Linda Wilson', 'F', 'USA', 'PA', 'Philadelphia', '202 Cedar St', '19101', '+1 890-1234', 70000.00, 'Regular'),
        (106, 'Michael Lee', 'M', 'USA', 'AZ', 'Phoenix', '303 Maple St', '85001', '+1 901-2345', 85000.00, 'Regular'),
        (107, 'Sophia Anderson', 'F', 'USA', 'TX', 'San Antonio', '404 Birch St', '78201', '+1 012-3456', 95000.00, 'Regular'),
        (108, 'Christopher Clark', 'M', 'USA', 'CA', 'San Diego', '505 Spruce St', '92101', '+1 123-4567', 72000.00, 'Regular'),
        (109, 'Olivia Turner', 'F', 'USA', 'TX', 'Dallas', '606 Ash St', '75201', '+1 234-5678', 88000.00, 'Regular'),
        (110, 'James Baker', 'M', 'USA', 'CA', 'San Jose', '707 Fir St', '95101', '+1 345-6789', 78000.00, 'Regular');
        
        `;

        const result14 = await pool.query(query14);
        console.log('Query 14 Result:', result14);

        const query11 = `
        CREATE TABLE sales (
          Invoice_ID INT PRIMARY KEY,
          Customer_ID INT,
          VIN VARCHAR(17),
          Sale_Price DECIMAL(10, 2),
          Sale_Date DATE,
          FOREIGN KEY (Customer_ID) REFERENCES customer(Customer_ID),
          FOREIGN KEY (VIN) REFERENCES car_specs(VIN)
      );
      
        `;

        const result11 = await pool.query(query11);
        console.log('Query 11 Result:', result11);

        const query12 = `
        INSERT INTO sales (Invoice_ID, Customer_ID, VIN, Sale_Price, Sale_Date)
        VALUES
        (1, 101, 'VIN1', 25000.00, '2022-05-15'),
        (2, 102, 'VIN2', 28000.00, '2022-06-10'),
        (3, 103, 'VIN3', 30000.00, '2022-07-18'),
        (4, 104, 'VIN4', 27000.00, '2022-08-21'),
        (5, 105, 'VIN5', 32000.00, '2022-09-05'),
        (6, 106, 'VIN6', 26000.00, '2023-01-12'),
        (7, 107, 'VIN7', 31000.00, '2023-02-19'),
        (8, 108, 'VIN8', 29000.00, '2023-03-08'),
        (9, 109, 'VIN9', 27000.00, '2023-04-14'),
        (10, 110, 'VIN10', 33000.00, '2023-05-22');
        `;
        const result12 = await pool.query(query12);
        console.log('Query 12 Result:', result12);


        


    } catch (error) {
      console.error('Error running queries:', error);
      rl.close();;
    } 
  }
  
  // Run the queries
  runQueries();

  app.get('/', async (req, res) => {
    try {
        
        res.status(200).send(runQueries().rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => console.log(`Server is running on port ${port}`));

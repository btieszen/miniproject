import requests
import json
import mysql
import mysql.connector




from flask import Flask,jsonify,request
from flask_marshmallow import Marshmallow
import mysql.connector
from mysql.connector import Error
from flask_sqlalchemy import SQLAlchemy
from marshmallow import fields
from marshmallow import ValidationError
from flask_cors import CORS

#Sets up database
app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='mysql+mysqlconnector://root:#Comco92505@localhost/e_commerce_db'
db=SQLAlchemy(app)
ma=Marshmallow(app)
CORS(app)

#Sets up schema
class CustomersSchema(ma.Schema):
    #id = db.Column(db.Integer,primary_key=True)
    id = fields.Int()
    name = fields.String(required = True)
    email = fields.String(required = True)
    phone = fields.String(required = True)
    #orders =fields.String(foreign_key = True)
    
class Meta:
        fields=("id","name","email","phone")
        
customer_schema=CustomersSchema()
customers_schema=CustomersSchema(many=True)

class OrdersSchema(ma.Schema):
    #id = db.Column(db.Integer,primary_key=True)
    id = fields.Int()
    name = fields.String(required = True)
    email = fields.String(required = True)
    phone = fields.String(required = True)
    product = fields.String(required = True)
    price = fields.String(required = True)
    quanity = fields.String(required = True)
    #orders =fields.String(foreign_key = True)
    
class Meta:
        fields=("id","name","email","phone","product","price","quanity")
        
order_schema=OrdersSchema()
orders_schema=OrdersSchema(many=True)

class Customer_accountsSchema(ma.Schema):
    id =db.Column(db.Integer,primary_key=True)
    username = fields.String(required =True)
    password = fields.String(required=True)
    customer_id =fields.Integer(foreign_key=True)
    
    class Meta:
        fields=('username','password','customer_id','id')
        
customer_account_schema=Customer_accountsSchema()
customer_accounts_schema=Customer_accountsSchema(many=True)
 
class ProductsSchema(ma.Schema):
    id =db.Column(db.Integer,primary_key=True)
    name=fields.String(required=True)
    price=fields.Float(required=True)
       
    class Meta:
        fields=('name','price','id')
        
product_schema=ProductsSchema()
products_schema=ProductsSchema(many=True)

class Customer_orderSchema(ma.Schema):
    id = db.Column(db.Integer,primary_key=True)
    order_date =fields.String(required=True)
    customer_id =fields.Integer(foreign_key=True)
    product_id= fields.Integer(foreign_key=True)
    delivery_date=fields.String(required=True)
    
    class Meta:
        fields=('order_date','customer_id','product_id','delivery_date','id')
        
customer_order_schema=Customer_orderSchema()
customer_orders_schema=Customer_orderSchema(many=True)

@app.route('/')
def home():
    return "Customer and customer Accounts"

# SETS UP TABELS

class Products(db.Model):
    __tablename__="Products"
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(255),nullable=False)
    price=db.Column(db.Float,nullable=False)

class Customer(db.Model):
    __tablename__="Customers"
    id = db.Column(db.Integer,primary_key= True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(320))
    phone = db.Column(db.String(15))
    
class Order(db.Model):
    __tablename__="Orders"
    id = db.Column(db.Integer,primary_key= True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(320))
    phone = db.Column(db.String(15))
    product = db.Column(db.String(320))
    price = db.Column(db.String(15))
    quanity = db.Column(db.String(15))
    
class Customer_accounts(db.Model):
    __tablename__="Customer_Accounts"
    id = db.Column(db.Integer,primary_key = True)
    username=db.Column(db.String (255),nullable = False)
    password = db.Column(db.String(255),nullable = False)
    customer_id=db.Column(db.Integer,db.ForeignKey('Customers.id'))
    
class Customer_order(db.Model):
    __tablename__="Customer_order"
    id = db.Column(db.Integer,primary_key=True)
    order_date=db.Column(db.String(255),nullable=False)
    customer_id=db.Column(db.Integer,db.ForeignKey("Customers.id"))
    product_id=db.Column(db.Integer,db.ForeignKey("Products.id"))
    delivery_date=db.Column(db.String(255),nullable=False)

#Adds customer
   
@app.route('/customers',methods=['POST'])
def add_customers():
    try:
        customers_data=customer_schema.load(request.json)
    except ValidationError as  err:
        return jsonify({'message':'Invalid entry'}),400
    new_customer= Customer(name=customers_data['name'],email=customers_data['email'],phone=customers_data['phone'])
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({'message':'New Customer added successfully'}),201

@app.route('/orders',methods=['POST'])
def add_orders():
    try:
        orders_data=order_schema.load(request.json)
    except ValidationError as  err:
        return jsonify({'message':'Invalid entry'}),400
    new_order= Order(name=orders_data['name'],email=orders_data['email'],phone=orders_data['phone'],product=orders_data['product'],price=orders_data['price'],quanity=orders_data['quanity'])
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message':'New Order added successfully'}),201

#Gets all customer information
@app.route('/customers',methods=["GET"])
def get_customers():
    customers=Customer.query.all()
    return customers_schema.jsonify(customers)

@app.route('/orders',methods=["GET"])
def get_orders():
    orders=Order.query.all()
    return orders_schema.jsonify(orders)

#Gets Customer information by a specific member
@app.route('/customers/by-id',methods=["GET"])
def query_customers_by_id():
    id=request.args.get('id')
    customer=Customer.query.filter_by(id=id).all()
    if customer:
        return customers_schema.jsonify(customer)
    else:
        return jsonify({'message':"customer not found"}),404
    
#Updates Customer
@app.route('/customers/<int:id>', methods=['PUT'])
def update_customers(id):
    customers=Customer.query.get_or_404(id)
    try:
        customers_data=customer_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"message":"Customer not found"}),400
    customers.name=customers_data['name']
    customers.email=customers_data['email']
    customers.phone=customers_data['phone']
    db.session.commit()
    return jsonify({"message":"Customer data is updated successfully"}),200

#Deletes customer
@app.route('/customers/<int:id>', methods=["DELETE"])
def delete_customers(id):
    customers=Customer.query.get_or_404(id)
    db.session.delete(customers)
    db.session.commit()
    return jsonify({"message":"Customer removed successfully"}),200

#Adds customer account
@app.route('/customer_accounts',methods=['POST'])
def add_customer_account():
    try:
        customer_accounts_data=customer_account_schema.load(request.json)
    except ValidationError as  err:
        return jsonify(err.messages),400
    new_customer_accounts= Customer_accounts(username=customer_accounts_data['username'],password=customer_accounts_data['password'],customer_id=customer_accounts_data['customer_id'])
    db.session.add(new_customer_accounts)
    db.session.commit()
    return jsonify({'message':'New Customer account added successfully'}),201

#Gets all customer_accounts information   
@app.route('/customer_accounts',methods=["GET"])
def get_customer_accounts():
    customer_account=Customer_accounts.query.all()
    return customer_accounts_schema.jsonify(customer_account)

#Gets Customer account information by a specific member
@app.route('/customer_accounts/by-id',methods=["GET"])
def query_customer_accounts_by_id():
    id=request.args.get('id')
    customer_account=Customer_accounts.query.filter_by(id=id).all()
    if customer_account:
        return customer_accounts_schema.jsonify(customer_account)
    else:
        return jsonify({'message':"customer not found"}),404
    
#Updates Customer account
@app.route('/customer_accounts/<int:id>', methods=['PUT'])
def update_customer_accounts(id):
    customer_accounts=Customer_accounts.query.get_or_404(id)
    try:
        customer_accounts_data=customer_account_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"message":"Customer not found"}),400
    customer_accounts.username=customer_accounts_data['username']
    customer_accounts.password=customer_accounts_data['password']
    customer_accounts.customer_id=customer_accounts_data['customer_id']
    db.session.commit()
    return jsonify({"message":"Customer account has updated successfully"}),200

#Deletes member
@app.route('/customer_accounts/<int:id>', methods=["DELETE"])
def delete_customer_accounts(id):
    customer_accounts=Customer_accounts.query.get_or_404(id)
    db.session.delete(customer_accounts)
    db.session.commit()
    return jsonify({"message":"Customer account has been removed successfully"}),200

#ADDS Product
@app.route('/products',methods=['POST'])
def add_products():
    try:
        products_data=product_schema.load(request.json)
    except ValidationError as  err:
        return jsonify(err.messages),400
    new_product= Products(name=products_data['name'],price=products_data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message':'New Product added successfully'}),201

#Gets all product information   
@app.route('/products',methods=["GET"])
def get_products():
    products=Products.query.all()
    return products_schema.jsonify(products)

#Gets a product by its id
@app.route('/products/by-id',methods=["GET"])
def query_products_by_id():
    id=request.args.get('id')
    product=Products.query.filter_by(id=id).all()
    if product:
        return products_schema.jsonify(product)
    else:
        return jsonify({'message':"product not found"}),404
    
#Deletes product
@app.route('/products/<int:id>', methods=["DELETE"])
def delete_product(id):
    product=Products.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message":"Product has been removed successfully"}),200

#Updates Product
@app.route('/products/<int:id>', methods=['PUT'])
def update_products(id):
    products=Products.query.get_or_404(id)
    try:
        products_data=product_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"message":"Product not found"}),400
    products.name=products_data['name']
    products.price=products_data['price']
   
    db.session.commit()
    return jsonify({"message":"Product data is updated successfully"}),200

#ADD Orders

@app.route('/customer_order',methods=['POST'])
def add_customer_order():
    try:
        customer_order_data=customer_order_schema.load(request.json)
    except ValidationError as  err:
        return jsonify(err.messages),400
    new_customer_order= Customer_order(order_date=customer_order_data['order_date'],customer_id=customer_order_data['customer_id'],product_id=customer_order_data['product_id'],delivery_date=customer_order_data['delivery_date'])
    
    db.session.add(new_customer_order)
    db.session.commit()
    return jsonify({'message':'New Order added successfully'}),201

#Gets all customer order information   
@app.route('/customer_order',methods=["GET"])
def get_customer_order():
    customer_order=Customer_order.query.all()
    return customer_orders_schema.jsonify(customer_order)

#Gets a order by its id
@app.route('/customer_order/by-id',methods=["GET"])
def query_customer_order_by_id():
    id=request.args.get('id')
    customer_order=Customer_order.query.filter_by(id=id).all()
    if customer_order:
        return customer_orders_schema.jsonify(customer_order)
    else:
        return jsonify({'message':"Order not found"}),404
    
#Gets Customer order information
@app.route('/customer_order/by-customer_id',methods=["GET"])
def query_customer_orders_by_customer_id():
    customer_id=request.args.get('customer_id')
    customer_orders=Customer_order.query.filter(Customer_order.customer_id == customer_id).all()
    if customer_orders:
        return customer_orders_schema.jsonify(customer_orders)
    else:
        return jsonify({'message':"Order not found"}),404



with app.app_context():
    db.create_all()
    
if __name__=='__main__':
    app.run(debug=True)
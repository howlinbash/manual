[The Howlin Developer Guide](/index.md)



SQLAlchemy
==========


## Contents


- [SQLAlchemy ORM for Beginners](##SQLAlchemy ORM for Beginners)
  - [Getting Started](###Getting Started)
  - [Cookie Model](###Cookie Model)
  - [Queries](###Queries)
  - [Relationships](###Relationships)


## SQLAlchemy ORM for Beginners


Jason Myers
https://www.youtube.com/watch?v=51RpDZKShiw

core - schema centric
ORM - user model


### Getting Started

Connecting - create an engine
```python
from sqlalchemy import create_engine

engine = create_engine('sqlite:///:memory:') # password/user in this string
```

Establishing a Session
```python
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)

session = Session()
```

Model Base
```python
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
```


### Cookie Model

Anytime we create a model (an ORM Object) for SQLA it must have 4 properties
- it must inherit from the declaritive base
- it has to have an underscore underscore table name
  - this tells us where in the database we will store this
- We need one or more columns
- at least one of the columns must find a primary key

```python
from sqlalchemy import Column, Integer, Numeric, String

class Cookie(Base):
    __tablename__ = 'cookies'

    cookie_id = Column(Integer, primary_key=True)
    cookie_name = Column(String(50), index=True)
    cookie_recipe_url = Column(String(255))
    cookie_sku = Column(String(55))
    quantity = Column(Integer())
    unit_cost = Column(Numeric(12, 2))
```

Persisting our Table

This creates our cookie object in our in-memory SQL DB
```python
Base.metadata.create_all(engine)
```

Adding a Cookie

Here we're gonna create an instance of our cookie class
- SQLA gives us an __init__ under the hood so we don't have to write it.
```python
cc_cookie = Cookie(cookie_name='chocolate chip',
                   cookie_recipe_url='http://ome.awesom.me/cookie/choc.html',
                   cookie_sku='CC01',
                   quantity=12,
                   unit_cost=0.50)
```

Adding to Session
```python
session.add(cc_cookie)
session.commit()
```

Accessing Attributes
```python
print(cc_cookie.cookie_id)

1
```

Bulk Inserts
```python
c1 = Cookie(cookie_name='peanut butter',
            cookie_recipe_url='http://ome.awesom.me/cookie/peanut.html',
            cookie_sku='PB01',
            quantity=24,
            unit_cost=0.25)
c2 = Cookie(cookie_name='oatmean raisin',
            cookie_recipe_url='http://ome.awesom.me/cookie/raisin.html',
            cookie_sku='EWW01',
            quantity=100,
            unit_cost=1.00)
session.bulk_save_objects([c1,c2])
session.commit()
```

Unlike in the session.add() example above, 
session.bulk_save_object() does not store cookie in our session
c1.cookie_id will return nothing


### Queries

All The Cookies
```python
cookies = session.query(Cookie).all()
print(cookies)

[ Cookie(cookie_name='chocolate chip',
         cookie_recipe_url='http://ome.awesom.me/cookie/choc.html',
         cookie_sku='CC01', quantity=12, unit_cost=0.50),
  Cookie(cookie_name='peanut butter',
         cookie_recipe_url='http://ome.awesom.me/cookie/peanut.html',
         cookie_sku='PB01', quantity=24, unit_cost=0.25),
  Cookie(cookie_name='oatmean raisin',
         cookie_recipe_url='http://ome.awesom.me/cookie/raisin.html',
         cookie_sku='EWW01', quantity=100, unit_cost=1.00) ]
```

All The Cookies - Iterator
```python
for cookie in session.query(Cookie):
    print(cookies)

[ Cookie(cookie_name='chocolate chip',
         cookie_recipe_url='http://ome.awesom.me/cookie/choc.html',
         cookie_sku='CC01', quantity=12, unit_cost=0.50),
  Cookie(cookie_name='peanut butter',
         cookie_recipe_url='http://ome.awesom.me/cookie/peanut.html',
         cookie_sku='PB01', quantity=24, unit_cost=0.25),
  Cookie(cookie_name='oatmean raisin',
         cookie_recipe_url='http://ome.awesom.me/cookie/raisin.html',
         cookie_sku='EWW01', quantity=100, unit_cost=1.00) ]
```

Particular Attributes
```python
print(session.query(Cookie.cookie_name, Cookie.quantity).first())

('chocolate chip', 12)
```

Order By
```python
for cookie in session.query(Cookie).order_by(Cookie.quantity):
    print('{:3} - {}'.format(cookie.quantity, cookie.cookie_name))

  12 - chocolate chip
  24 - peanut butter
 100 - oatmeal raisin
```

Descending
```python
from sqlachemy import desc

for cookie in session.query(Cookie).order_by(desc(Cookie.quantity)):
    print('{:3} - {}'.format(cookie.quantity, cookie.cookie_name))

 100 - oatmeal raisin
  24 - peanut butter
  12 - chocolate chip
```

Limiting

So far we've been querying the whole table. here we just take 2
We can add some conditional querys where the for loop is.
```python
query = session.query(Cookie).order_by(Cookie.quantity).limit(2)
    print([result.cookie_name for result in query])

['chocolate chip', 'peanut butter']
```

Database Functions

Sometimes it makes more sense for the DB to do the work
func.sum calls the postgres sum function native to the table type
```python
from sqlalchemy import func

inv_count = session.query(func.sum(Cookie.quantity)).scaler()
print(inv_count)

136
```

Database Functions Count
```python
rec_count = session.query(func.count(Cookie.cookie_name)).first()
print(rec_count)

(3, 0)
```

Labeling
```python
rec_count = session.query(func.count(Cookie.cookie_name) \
                          .label('inventory_count')).first()
print(rec_count.keys())
print(rec_count.inventory_count)

['inventory_count']
5
```

Filter_By

Don't use this. Use filter instead (Filter: explicit; Filter_By: implicit)
```python
record = session.query(Cookie). \
             filter_by(cookie_name='chocolate chip').first()
print(record)

Cookie(cookie_name='chocolate chip',
       cookie_recipe_url='http://some.aweso.me/cookie/recipe.html',
       cookie_sku='CC01', quantity=12, unit_cost=0.50)
```

Filter
```python
record = session.query(Cookie). \
             filter(Cookie.cookie_name == 'chocolate chip').first()
print(record)
```

Clauseelements
Because this is now an explicit column, we can use clauseelements like 'like'
There are more clauseelement methods below.
```python
query = session.query(Cookie).filter(
            Cookie.cookie_name.like('%chocolate%'))
for record in query:
    print(record.cookie_name)
    
chocolate chip
```

Clauseelement Methods
```python
# Find where the column is between cleft and cright
between(cleft, cright)

# Find only unique values for column
distinct()

# Find where the column is in the list
in_([list])

# Find where the column is None (commonly used for Null checks with None)
is_(None)

# Find where the column has 'string' in it (Case-sensitive)
contains('string')

# Find where the column ends with 'string' (Case-sensitive)
endswith('string')

# Find where the column begins with 'string' (Case-sensitive)
startswith('string')

# Find where the column is like 'string' (NOT Case-sensitive)
like('string')
```

Operators

by casting the result of the 2 columns to the label 'inv_cost', we are able
to use reference the result with result.inv_cost for the lifetime of the 
query variable (which isn't long).
```python
from sqlalchemy import cast
query = session.query(Cookie.cookie_name,
                      cast((Cookie.quantity * Cookie.unit_cost),
                          Numeric(12,2)).label('inv_cost'))
for result in query:
    print('{} - {}'.format(result.cookie_name, result.inv_cost))
    
chocolate chip - 6.00
peanut butter - 6.00
oatmeal raisin - 100.00
```

Conjunctions
```python
from sqlalchemy import and_, or_, not_
query = session.query(Cookie).filter(
    or_(
        Cookie.quantity.between(10, 50),
        Cookie.cookie_name.contains('chip')
    )
)
for result in query:
    print(result.cookie_name)

chocolate chip
peanut butter
```

Updating Cookies
```python
query = session.query(Cookie)
cc_cookie = query.filter(Cookie.cookie_name == "chocolate chip").first()

cc_cookie.quantity = cc_cookie.quantity + 120

session.commit()
print(cc_cookie.quantity)

132
```

Deleting Cookies
```python
query = session.query(Cookie)
query = query.filter(Cookie.cookie_name == "peanut butter")

dcc_cookie = query.one()
session.delete(dcc_cookie)
session.commit()

dcc_cookie = query.first()
print(dcc_cookie)

None
```


### Relationships

Imports
```python
from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship, backref
```

User Model
```python
class User(Base):
    __tablename__ = 'users'
    
    user_id = Column(Integer(), primary_key=True)
    username = Column(String(15), nullable=False, unique=True)
    email_address = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    password = Column(String(25), nullable=False)
    created_on = Column(DateTime(), default=datetime.now)
    updated_on = Column(DateTime(), default=datetime.now, onupdate=datetime.n
```

Order Model

the user_id ForeignKey glues users & orders together on the db side
the user relationship() glues them together on the Object side.
```python
class Order(Base):
    __tablename__ = 'orders'
    
    order_id = Column(Integer(), primary_key=True)
    user_id = Column(Integer(), ForeignKey('users.user_id'))
    shipped = Column(Boolean(), default=False)
    
    user = relationship("User", backref=backref('orders', order_by=order_id)
```

LineItem Model

Without the backref for cookie i cannot go cookie.order and see every order
anyone ever made for a particular cookie.
```python
class LineItem(Base):
    __tablename__ = 'line_items'
    
    line_item_id = Column(Integer(), primary_key=True)
    order_id = Column(Integer(), ForeignKey('orders.order_id'))
    cookie_id = Column(Integer(), ForeignKey('cookies.cookie_id'))
    quantity = Column(Integer())
    extended_cost = Column(Numeric(12, 2))
    
    order = relationship("Order", backref=backref('line_items', order_by=line
    cookie = relationship("Cookie", uselist=False)
```

Persist Them

only the changed things will be added to the db
```python
Base.metadata.create_all(engine)
```

Defining a User
```python
cookiemon = User(username='cookiemon',
                 email_address='mon@cookie.com',
                 phone='111-111-1111',
                 password='password')

session.add(cookiemon)

session.commit()
```

Setting Up an Order
```python
o1 = Order()
o1.user = cookiemon
session.add(o1)
```

Preparing Line Items
```python
cc = session.query(Cookie).filter(Cookie.cookie_name ==
                                  "chocolate chip").one()
line1 = LineItem(cookie=cc, quantity=2, extended_cost=1.00)

pb = session.query(Cookie).filter(Cookie.cookie_name ==
                                  "oatmeal raisin").one()
line2 = LineItem(quantity=12, extended_cost=3.00)
line2.cookie = pb
```

Associate Order and Line Items
```python
o1.line_items.append(line1)
o1.line_items.append(line2)

session.commit()
```

Using Relationships in Queries
```python
query = session.query(Order.order_id, User.username, User.phone,
                      Cookie.cookie_name, LineItem.quantity, 
                      LineItem.extended_cost)
query = query.join(User).join(LineItem).join(Cookie)
results = query.filter(User.username == 'cookiemon').all()
print(results)

[(1, 'cookiemon', '111-111-1111', 'chocolate chip', 2, Decimal('1.00')),
 (1, 'cookiemon', '111-111-1111', 'oatmeal raisin', 12, Decimal('3.00'
```

Another Example
```python
query = session.query(User.username, func.count(Order.order_id))
query = query.outerjoin(Order).group_by(User.username)
for row in query:
    print(row)
    
('cookiemon', 1)
```

What Other Things are Out There?
- Automap
- Geospatial
- Queries

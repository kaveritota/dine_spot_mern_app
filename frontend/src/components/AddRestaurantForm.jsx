import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurantForm = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    cuisine: '',
    image: '',
    menu: [{ name: '', price: '', description: '' }]
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const menu = [...form.menu];
      menu[index][name] = value;
      setForm({ ...form, menu });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addMenuItem = () => {
    setForm({ ...form, menu: [...form.menu, { name: '', price: '', description: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/restaurants', form);
      alert('Restaurant added!');
    } catch (err) {
      console.error(err);
      alert('Failed to add restaurant');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <h2>Add Restaurant</h2>
      <input type="text" name="name" placeholder="Restaurant Name" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="cuisine" placeholder="Cuisine" onChange={handleChange} required />
      <input type="text" name="image" placeholder="Image URL" onChange={handleChange} />

      <h3>Menu</h3>
      {form.menu.map((item, i) => (
        <div key={i}>
          <input type="text" name="name" placeholder="Dish name" value={item.name} onChange={(e) => handleChange(e, i)} />
          <input type="number" name="price" placeholder="Price" value={item.price} onChange={(e) => handleChange(e, i)} />
          <input type="text" name="description" placeholder="Description" value={item.description} onChange={(e) => handleChange(e, i)} />
        </div>
      ))}
      <button type="button" onClick={addMenuItem}>+ Add More Menu Item</button>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddRestaurantForm;

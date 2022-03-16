import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
	const getLocalStorage = () => {
		let list = localStorage.getItem('list');
		return list ? JSON.parse(list) : [];
	};

	const [name, setName] = useState('');
	const [list, setList] = useState(getLocalStorage());
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [alert, setAlert] = useState({
		show: false,
		message: '',
		type: '',
	});

	const onFormSubmit = event => {
		event.preventDefault();

		if (!name) {
			showAlert(true, 'danger', 'Please enter a name');
		} else if (name && isEditing) {
			setList(
				list.map(item => (item.id === editId ? { ...item, title: name } : item))
			);
			setName('');
			setEditId(null);
			setIsEditing(false);
			showAlert(true, 'success', 'Item updated');
		} else {
			showAlert(true, 'success', 'Item added to the list');
			const newItem = { id: new Date().getTime().toString(), title: name };
			setList([...list, newItem]);
			setName('');
		}
	};
	const showAlert = (show = false, type = '', message = '') => {
		setAlert({ show, type, message });
	};

	const clearList = () => {
		showAlert(true, 'danger', 'List cleared');
		setList([]);
	};

	const removeItem = id => {
		showAlert(true, 'danger', 'Item removed');
		setList(list.filter(item => item.id !== id));
	};

	const editItem = id => {
		const specificItem = list.find(item => item.id === id);
		setIsEditing(true);
		setEditId(id);
		setName(specificItem.title);
	};

	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list));
	}, [list]);
	return (
		<section className='section-center'>
			<form className='grocery-form' onSubmit={onFormSubmit}>
				{alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
				<h3>Grocery bud</h3>
				<div className='form-control'>
					<input
						type='text'
						className='grocery'
						placeholder='e.g eggs'
						value={name}
						onChange={event => setName(event.target.value)}
					/>
					<button type='submit' className='submit-btn'>
						{isEditing ? 'edit' : 'Submit'}
					</button>
				</div>
			</form>
			{list.length > 0 && (
				<div className='grocery-container'>
					<List items={list} removeItem={removeItem} editItem={editItem} />
					<button className='clear-btn' onClick={clearList}>
						clear items
					</button>
				</div>
			)}
		</section>
	);
}

export default App;

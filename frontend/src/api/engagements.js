export default {
  async getAll() {
    const request = await fetch(`http://localhost:3000/engagements`, {
      method: 'GET'
    })
    const response = await request.json();
    return response;
  },
  async getById(id) {
    const request = await fetch(`http://localhost:3000/engagements/${id}`, {
      method: 'GET'
    })
    const response = await request.json();
    return response;
  },
  async create(name, client, employee, description) {
    const request = await fetch(`http://localhost:3000/engagements/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        client: client,
        employee: employee,
        description: description
      })
    })
    const response = await request.json();
    return response;
  },
  async end(id) {
    const request = await fetch(`http://localhost:3000/engagements/${id}/end`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id
      })
    })
    const response = await request.json();
    return response;
  },
  async update(id, name, description) {
    const request = await fetch(`http://localhost:3000/engagements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        name: name,
        description: description
      })
    })
    const response = await request.json();
    return response;
  },
  async delete(id) {
    const request = await fetch(`http://localhost:3000/engagements/${id}`, {
      method: 'DELETE'
    })
    const response = await request.json();
    return response;
  }
}

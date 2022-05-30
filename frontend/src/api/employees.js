export default {
  async getAll() {
    const request = await fetch(`http://localhost:3000/employees`, {
      method: 'GET'
    })
    const response = await request.json();
    return response;
  },
  async getById(id) {
    const request = await fetch(`http://localhost:3000/employees/${id}`, {
      method: 'GET'
    })
    const response = await request.json();
    return response;
  },
  async getEngagements(id) {
    const request = await fetch(`http://localhost:3000/employees/${id}/engagements`, {
      method: 'GET'
    })
    const response = await request.json();
    return response;
  },
  async create(name) {
    const request = await fetch(`http://localhost:3000/employees/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name
      })
    })
    const response = await request.json();
    return response;
  },
  async update(id, name) {
    const request = await fetch(`http://localhost:3000/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name
      })
    })
    const response = await request.json();
    return response;
  },
  async delete(id) {
    const request = await fetch(`http://localhost:3000/employees/${id}`, {
      method: 'DELETE'
    })
    const response = await request.json();
    return response;
  }
}

interface Employee {
  id?: number,
  name: string,
  firstName: string,
  position: string,
  team: string,
  '@context'?: string | object,
  '@id'?: string,
  '@type'?: string
}

export default Employee;

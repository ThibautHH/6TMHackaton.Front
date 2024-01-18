import Premise from './Premise';

interface Employee {
  id?: number,
  name: string,
  firstName: string,
  position: string,
  team: string,
  premise?: Premise,
  '@context'?: string | object,
  '@id'?: string,
  '@type'?: string
}

export default Employee;

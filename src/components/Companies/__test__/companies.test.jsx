import { expect, test } from 'vitest'
import { render, screen } from '../../../test-utils/testing_provider'
import Companies from '../companies'

beforeAll(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ([]), // or provide mock company data here
  });
});

afterAll(() => {
  global.fetch = undefined;
});

describe('Companies Component', () => { 
  test('Renders component title', () => {
    render(<Companies />)
    
    const companiesTitle = screen.getByRole('heading', { title: /companies/i })
    
    expect(companiesTitle).toBeInTheDocument()
  })
 })
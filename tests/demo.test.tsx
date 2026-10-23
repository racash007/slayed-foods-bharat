import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('Slayd Foods Bharat demo', () => {
  it('navigates from the homepage to a brand range', () => {
    window.location.hash = '';
    render(<App />);
    fireEvent.click(within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('button', { name: 'Snaxzastic' }));
    expect(screen.getByRole('heading', { name: /Snack loud/i })).toBeInTheDocument();
    expect(screen.getAllByText('Nimbu Pudina Roasted Chana').length).toBeGreaterThan(0);
  });

  it('walks through the distributor demo and clearly says nothing was sent', () => {
    window.location.hash = '';
    render(<App />);
    fireEvent.click(within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('button', { name: /Become a distributor/i }));
    expect(screen.getByRole('heading', { name: /Business identity/i })).toBeInTheDocument();
    const form = screen.getByRole('button', { name: /Continue/i }).closest('form')!;
    fireEvent.submit(form);
    expect(screen.getByRole('heading', { name: /Territory & operations/i })).toBeInTheDocument();
    fireEvent.submit(screen.getByRole('button', { name: /Continue/i }).closest('form')!);
    expect(screen.getByRole('heading', { name: /Trade profile/i })).toBeInTheDocument();
    fireEvent.submit(screen.getByRole('button', { name: /Continue/i }).closest('form')!);
    expect(screen.getByRole('heading', { name: /Compliance & close/i })).toBeInTheDocument();
    fireEvent.submit(screen.getByRole('button', { name: /Show demo confirmation/i }).closest('form')!);
    expect(screen.getByText(/wasn’t sent or saved/i)).toBeInTheDocument();
  });

  it('shows a staff review mockup without a login screen', () => {
    window.location.hash = '';
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Staff review screen/i }));
    expect(screen.getByRole('heading', { name: /Review queue/i })).toBeInTheDocument();
    expect(screen.getByText(/No staff authentication/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Mark reviewed/i }));
    expect(screen.getByText(/Marked reviewed \(demo\)/i)).toBeInTheDocument();
  });
});

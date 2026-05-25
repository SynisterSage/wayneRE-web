import { Link } from 'react-router-dom';
import Button from '../../ui/Button.jsx';
import Container from '../../ui/Container.jsx';

const contactDetails = [
  { label: 'Email', value: 'starletferguson@gmail.com' },
  { label: 'Cell', value: '(862) 226-9281' },
  { label: 'Office', value: '(973) 696-0077' },
  {
    label: 'Address',
    value: ['1700 Rt. 23 North, Suite 300', 'Wayne, NJ 07470'],
  },
];

export default function FinalCTA() {
  return (
    <section className="bg-brand-sand text-stone-900">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <div className="max-w-104 lg:pt-3">
            <h2 className="font-serif text-[clamp(2.55rem,4vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-stone-900">
              Ready for a clearer
              <span className="block italic text-brand-lake">next move?</span>
            </h2>

            <p className="mt-6 text-[1rem] leading-[1.8] text-stone-700 sm:text-[1.05rem]">
              Whether you are planning to sell, starting your search, or trying to understand the
              Wayne and Packanack market, start with a grounded local conversation.
            </p>

            <dl className="mt-10 space-y-4">
              {contactDetails.map((item) => (
                <div
                  key={item.label}
                  className={`grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-4 ${
                    item.label === 'Office Address' ? 'pt-2' : ''
                  }`}
                >
                  <dt className="whitespace-nowrap text-[0.62rem] font-bold uppercase tracking-[0.28em] text-stone-500">
                    {item.label}
                  </dt>
                  <dd className="text-[0.98rem] leading-[1.6] text-stone-800">
                    {Array.isArray(item.value) ? (
                      <span className="block">
                        <span className="block">{item.value[0]}</span>
                        <span className="block">{item.value[1]}</span>
                      </span>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button to="/home-value" variant="primary" className="w-full sm:w-auto">
                Request a Home Valuation
              </Button>
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-stone-400 bg-transparent px-4 py-2 text-[0.98rem] font-medium text-stone-900 transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lake focus-visible:ring-offset-2 focus-visible:ring-offset-brand-sand sm:w-auto"
              >
                Send a Message
              </Link>
            </div>
          </div>

          <div className="max-w-lg rounded-none border border-stone-300 bg-brand-cream p-7 text-stone-900 sm:p-8 lg:p-10">
            <div className="max-w-lg">
              <p className="font-serif text-[1.25rem] italic leading-[1.3] tracking-[-0.02em] text-stone-900 sm:text-[1.35rem]">
                Send a note
              </p>

              <form className="mt-8 space-y-5" onSubmit={(event) => event.preventDefault()}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.28em] text-stone-500">
                      Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="w-full border border-stone-300 bg-white px-4 py-3 text-[0.98rem] text-stone-900 placeholder:text-stone-400 focus:border-brand-lake focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.28em] text-stone-500">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="w-full border border-stone-300 bg-white px-4 py-3 text-[0.98rem] text-stone-900 placeholder:text-stone-400 focus:border-brand-lake focus:outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.28em] text-stone-500">
                    Interest
                  </span>
                  <input
                    type="text"
                    name="interest"
                    placeholder="Selling in Packanack, Buying in Wayne, etc."
                    className="w-full border border-stone-300 bg-white px-4 py-3 text-[0.98rem] text-stone-900 placeholder:text-stone-400 focus:border-brand-lake focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.28em] text-stone-500">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="How can we help?"
                    className="min-h-32 w-full resize-none border border-stone-300 bg-white px-4 py-3 text-[0.98rem] text-stone-900 placeholder:text-stone-400 focus:border-brand-lake focus:outline-none"
                  />
                </label>

                <Button type="submit" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

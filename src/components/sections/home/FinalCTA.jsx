import Button from '../../ui/Button.jsx';
import Container from '../../ui/Container.jsx';

const contactDetails = [
  { label: 'Email', value: 'hello@waynenjrealestate.com' },
  { label: 'Phone', value: '(973) 555-0123' },
  { label: 'Address', value: 'Wayne, New Jersey 07470' },
];

export default function FinalCTA() {
  return (
    <section className="bg-[#1d1a18] text-brand-cream">
      <Container className="py-16 sm:py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <div className="max-w-152">
            <h2 className="font-serif text-[clamp(2.7rem,4.4vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.03em]">
              Ready for a different <span className="block italic text-brand-cream">perspective?</span>
            </h2>

            <p className="mt-6 max-w-lg text-[1rem] leading-[1.85] text-brand-cream/60 sm:text-[1.08rem]">
              Whether you are ready to sell, just starting your search, or simply curious about
              the Packanack lifestyle, the goal is the same: clear local insight and a calm next
              step.
            </p>

            <dl className="mt-12 space-y-5">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <dt className="w-16 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-brand-cream/35">
                    {item.label}
                  </dt>
                  <dd className="text-[0.98rem] text-brand-cream/90">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="#valuation" variant="primary" className="min-w-44">
                Request a Home Valuation
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                className="border-brand-cream/20 text-brand-cream! hover:bg-white/5!"
              >
                Start a Conversation
              </Button>
            </div>
          </div>

          <div className="border border-brand-cream/10 bg-white/4 p-6 sm:p-8 lg:p-10">
            <div className="max-w-136">
              <p className="font-serif text-[1.35rem] italic leading-[1.3] tracking-[-0.02em] text-brand-cream">
                Start a Conversation
              </p>

              <form className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-cream/35">
                      Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="w-full border-0 border-b border-brand-cream/15 bg-transparent px-0 py-3 text-brand-cream placeholder:text-brand-cream/22 focus:border-brand-cream focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-cream/35">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="w-full border-0 border-b border-brand-cream/15 bg-transparent px-0 py-3 text-brand-cream placeholder:text-brand-cream/22 focus:border-brand-cream focus:outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-cream/35">
                    Regarding
                  </span>
                  <input
                    type="text"
                    name="regarding"
                    placeholder="Selling in Packanack, Buying in Wayne, etc."
                    className="w-full border-0 border-b border-brand-cream/15 bg-transparent px-0 py-3 text-brand-cream placeholder:text-brand-cream/22 focus:border-brand-cream focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-cream/35">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="How can we help?"
                    className="min-h-32 w-full resize-none border border-brand-cream/15 bg-transparent px-3 py-3 text-brand-cream placeholder:text-brand-cream/22 focus:border-brand-cream focus:outline-none"
                  />
                </label>

                <Button href="#valuation" variant="primary" className="w-full">
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

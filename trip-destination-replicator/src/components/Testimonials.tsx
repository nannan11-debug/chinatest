
import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from './LanguageSwitcher';

const testimonials = [
  {
    id: 1,
    nameKey: "testimonial_1_name",
    locationKey: "testimonial_1_location",
    textKey: "testimonial_1_text",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 2,
    nameKey: "testimonial_2_name",
    locationKey: "testimonial_2_location",
    textKey: "testimonial_2_text",
    rating: 5,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 3,
    nameKey: "testimonial_3_name",
    locationKey: "testimonial_3_location",
    textKey: "testimonial_3_text",
    rating: 5,
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-travel-blue/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('testimonials_title')}</h2>
          <p className="mt-4 text-xl text-gray-600">
            {t('testimonials_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>

              <p className="text-gray-600 italic mb-6">"{t(testimonial.textKey)}"</p>

              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={t(testimonial.nameKey)}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{t(testimonial.nameKey)}</h4>
                  <p className="text-sm text-gray-500">{t(testimonial.locationKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

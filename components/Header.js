import Link from 'next/link';

export default function Header({ breadcrumbs = [] }) {
  return (
    <header className="text-center py-12">
      {/* Dynamic Breadcrumb Navigation */}
      <nav className="text-center mb-6">
        <ol className="inline-flex items-center space-x-1 text-sm font-medium text-gray-700">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="text-gray-400">/</span>}
              {breadcrumb.href ? (
                <Link href={breadcrumb.href} className="text-green-600 hover:text-green-800">
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="text-gray-500">{breadcrumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

 
      {/* Main Header Content */}
      <h1 className="text-5xl font-extrabold text-green-900 animate-bounce">oi GHG</h1>
           {/* Horizontal Line */}
           <hr className=" w-3/4 mx-auto border-green-700" />

    </header>
  );
}

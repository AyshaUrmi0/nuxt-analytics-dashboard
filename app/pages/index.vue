<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <Navbar />

    <div class="flex flex-1">
      <Sidebar />

      <main class="flex-1 p-8">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900">
            Dashboard
          </h2>

          <p class="mt-1 text-gray-500">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          <KpiCard
            title="Total Revenue"
            value="$24,500"
            change="+12.5%"
          />

          <KpiCard
            title="Total Orders"
            value="1,245"
            change="+8.2%"
          />

          <KpiCard
            title="Customers"
            value="8,420"
            change="+15.4%"
          />

          <KpiCard
            title="Total Sales"
            value="$12,840"
            change="+10.1%"
          />

        </div>

        <div class="mt-6">
 <ChartsRevenueBarChart />

</div>
<div class="mt-6">
  <ChartsSalesPieChart />
</div>
      </main>
    </div>
  </div>
</template>
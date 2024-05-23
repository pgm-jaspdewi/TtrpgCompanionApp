<template>
  <div class="max-w-maxWidth mx-auto">
    <!-- top row -->
    <div class="mb-4 h-32 flex tablet:flex-col laptopSm:flex-row justify-between">
      <div
        class="m-2 border-2 border-darkKhaki rounded-lg laptopSm:w-4/12 flex justify-center items-center"
      >
        Avatar + basic info
      </div>
      <div
        class="m-2 border-2 border-darkKhaki rounded-lg laptopSm:w-7/12 flex justify-center items-center"
      >
        Stats
      </div>
    </div>
    <!-- columns -->
    <div class="flex flex-col laptopSm:flex-row justify-between w-full">
      <!-- first two colums -->
      <div class="flex w-full laptopSm:w-8/12 mb-3">
        <!-- first column -->
        <div class="w-6/12 laptopSm:w-5/12 flex flex-col">
          <div
            class="mx-2 mt-1 border-2 border-darkKhaki rounded-lg h-32 flex justify-center items-center"
          >
            Saving throws
          </div>
          <div
            class="mx-2 mt-4 mb-1 border-2 border-darkKhaki rounded-lg grow flex justify-center items-center"
          >
            Skill throws
          </div>
        </div>

        <!-- second column -->
        <div class="w-6/12 laptopSm:w-7/12">
          <div class="w-full h-16 flex">
            <div
              class="mx-2 my-1 border-2 border-darkKhaki rounded-lg w-1/2 flex justify-center items-center"
            >
              Proficiency
            </div>
            <div
              class="mx-2 my-1 border-2 border-darkKhaki rounded-lg w-1/2 flex justify-center items-center"
            >
              Passive perception
            </div>
          </div>

          <div
            class="mx-2 my-3 border-2 border-darkKhaki rounded-lg h-80 flex justify-center items-center"
          >
            Hit points and stuff
          </div>
          <div
            class="mx-2 mb-1 border-2 border-darkKhaki rounded-lg h-80 flex justify-center items-center"
          >
            Attacks & spells
          </div>
        </div>
      </div>

      <!-- third column -->
      <div class="laptopSm:w-4/12 flex laptopSm:flex-col">
        <div
          class="mx-2 mb-3 border-2 border-darkKhaki rounded-lg h-96 flex justify-center items-center w-1/2 laptopSm:w-auto"
        >
          Features & traits
        </div>
        <div
          class="mx-2 mb-1 border-2 border-darkKhaki rounded-lg h-72 flex justify-center items-center w-1/2 laptopSm:w-auto"
        >
          Proficiencies & languages
        </div>
      </div>
    </div>
  </div>
</template>

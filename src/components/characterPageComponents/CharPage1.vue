<template>
  <div>
    <!-- top row -->
    <div class="mb-4 h-32 flex justify-between">
      <div class="m-2 border-2 border-darkKhaki rounded-lg w-4/12 flex justify-center items-center">
        Avatar + basic info
      </div>
      <div class="m-2 border-2 border-darkKhaki rounded-lg w-7/12 flex justify-center items-center">
        Stats
      </div>
    </div>
    <!-- columns -->
    <div class="flex justify-between">
      <!-- first column -->
      <div class="w-3/12">
        <div
          class="m-2 mt-1 border-2 border-darkKhaki rounded-lg h-32 flex justify-center items-center"
        >
          Saving throws
        </div>
        <div
          class="m-2 mt-4 mb-1 border-2 border-darkKhaki rounded-lg h-96 flex justify-center items-center"
        >
          Skill throws
        </div>
      </div>

      <!-- second column -->
      <div class="w-4/12">
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
          proficiencies & languages
        </div>
      </div>

      <!-- third column -->
      <div class="w-4/12">
        <div
          class="mx-2 mb-3 border-2 border-darkKhaki rounded-lg h-96 flex justify-center items-center"
        >
          Features & traits
        </div>
        <div
          class="mx-2 mb-1 border-2 border-darkKhaki rounded-lg h-72 flex justify-center items-center"
        >
          Attacks & spells
        </div>
      </div>
    </div>
  </div>
</template>

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  getPaginationItems,
} from "@qpub/qui";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {[1, 2, 3, 4, 5].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href="#" isActive={page === 2}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const ManyPages: Story = {
  name: "Many pages",
  render: () => {
    const current = 12;
    const items = getPaginationItems(current, 40);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {items.map((item, index) =>
            item === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink href="#" isActive={item === current}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Pagination key={size} size={size}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page === 2}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ))}
    </div>
  ),
};

export const DisabledEdges: Story = {
  name: "Disabled previous and next",
  render: () => (
    <div className="flex flex-col gap-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" isDisabled />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">8</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">9</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              10
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" isDisabled />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
};

function InteractivePagination() {
  const totalPages = 24;
  const [page, setPage] = useState(1);
  const items = getPaginationItems(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            asChild
            isDisabled={page <= 1}
          >
            <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft />
              <span className="hidden sm:block">Previous</span>
            </button>
          </PaginationPrevious>
        </PaginationItem>
        {items.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink asChild isActive={item === page}>
                <button type="button" onClick={() => setPage(item)}>
                  {item}
                </button>
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext asChild isDisabled={page >= totalPages}>
            <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              <span className="hidden sm:block">Next</span>
              <ChevronRight />
            </button>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export const Interactive: Story = {
  name: "Interactive (buttons)",
  render: () => <InteractivePagination />,
};

export const Compact: Story = {
  name: "Compact prev and next",
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text="" aria-label="Go to previous page" />
        </PaginationItem>
        <PaginationItem>
          <span className="text-muted px-2 text-sm tabular-nums">3 / 12</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" text="" aria-label="Go to next page" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

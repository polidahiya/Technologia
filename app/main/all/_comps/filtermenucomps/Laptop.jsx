"use client";
import React from "react";
import { filters } from "@/lib/data";
import Laptoplistview from "./Laptoplistview";
import Container from "./Container";
import Priceselection from "@/app/main/_comps/Priceselection";

function Laptop({ appliedfilters }) {
  return (
    <div className="w-72 space-y-2 shrink-0">
      {Object.entries(filters).map(([slug, filter]) => {
        const appliedValues = appliedfilters?.[slug]?.split(",") ?? [];
        return (
          <Container key={slug} title={filter.name}>
            {/* Special UI for price */}
            {slug === "Price" && (
              <>
                <Priceselection
                  minvalue={
                    appliedfilters?.Price
                      ? appliedfilters?.Price?.split("-")[0]
                      : 0
                  }
                  maxvalue={
                    appliedfilters?.Price
                      ? appliedfilters?.Price?.split("-")[1]
                      : 200000
                  }
                />
              </>
            )}

            <Laptoplistview
              name={slug}
              items={filter.options}
              multipleMode={filter?.multipleMode}
              appliedfilters={appliedValues}
            />
          </Container>
        );
      })}
    </div>
  );
}

export default Laptop;

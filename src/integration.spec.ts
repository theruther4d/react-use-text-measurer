const MAX_DEVIATION = 2;

export const tests = describe('Integration', () => {
  it(`useTextMeasurer is within ${MAX_DEVIATION}px accuracy`, async () => {
    await page.goto('http://localhost:8080');

    const sectionA = await page.$('[data-testid="a"]');
    const textA = await sectionA.$('[data-testid="text"]');
    const actualA = await textA.evaluate(
      (node) => node.getBoundingClientRect().width
    );
    const resultsA = await sectionA.$('[data-testid="measurement"]');
    const measurementA = await resultsA.evaluate((node) =>
      parseInt(node.textContent)
    );
    const deviationA = Math.abs(actualA - measurementA);

    expect(deviationA).toBeLessThan(MAX_DEVIATION);

    const sectionB = await page.$('[data-testid="b"]');
    const textB = await sectionB.$('[data-testid="text"]');
    const actualB = await textB.evaluate(
      (node) => node.getBoundingClientRect().width
    );
    const resultsB = await sectionB.$('[data-testid="measurement"]');
    const measurementB = await resultsB.evaluate((node) =>
      parseInt(node.textContent)
    );
    const deviationB = Math.abs(actualB - measurementB);

    expect(deviationB).toBeLessThan(MAX_DEVIATION);

    const sectionC = await page.$('[data-testid="c"]');
    const textC = await sectionC.$('[data-testid="text"]');
    const actualC = await textC.evaluate(
      (node) => node.getBoundingClientRect().width
    );
    const resultsC = await sectionC.$('[data-testid="measurement"]');
    const measurementC = await resultsC.evaluate((node) =>
      parseInt(node.textContent)
    );
    const deviationC = Math.abs(actualC - measurementC);

    expect(deviationC).toBeLessThan(MAX_DEVIATION);
  });
});
